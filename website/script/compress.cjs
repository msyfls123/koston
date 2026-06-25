const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// 支持的图片扩展名（根据需求可添加）
const SUPPORTED_EXTS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif'
]);

// 默认目标大小（100 KB）
const DEFAULT_TARGET_SIZE = 100 * 1024;

/**
 * 压缩单张图片到目标大小以下
 * @param {string} inputPath  - 源图片路径
 * @param {string} outputPath - 输出图片路径
 * @param {number} targetSize - 目标大小（字节）
 * @returns {Promise<void>}
 */
async function compressImage(inputPath, outputPath, targetSize) {
  // 读取原图，获取元数据
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // 根据原始格式决定输出格式和初始质量
  const ext = path.extname(inputPath).toLowerCase();
  let outputFormat = ext === '.png' ? 'png' :
                     ext === '.webp' ? 'webp' :
                     ext === '.avif' ? 'avif' :
                     'jpeg'; // 默认 jpeg

  // 质量/压缩参数的初始值
  let quality = 90;
  let compressionLevel = 9; // png 专用
  let scale = 1;           // 尺寸缩放比例

  // 循环尝试，直到满足大小要求
  for (let attempt = 0; attempt < 30; attempt++) {
    let processed = image.clone();

    // 如果缩放比例 < 1，先调整尺寸
    if (scale < 1) {
      const newWidth = Math.round(metadata.width * scale);
      const newHeight = Math.round(metadata.height * scale);
      processed = processed.resize(newWidth, newHeight, { fit: 'inside' });
    }

    // 根据格式设置输出选项
    let buffer;
    switch (outputFormat) {
      case 'jpeg':
        buffer = await processed.jpeg({ quality }).toBuffer();
        break;
      case 'png':
        buffer = await processed.png({ compressionLevel }).toBuffer();
        break;
      case 'webp':
        buffer = await processed.webp({ quality }).toBuffer();
        break;
      case 'avif':
        buffer = await processed.avif({ quality }).toBuffer();
        break;
      default:
        throw new Error(`不支持的输出格式: ${outputFormat}`);
    }

    // 检查大小
    if (buffer.length <= targetSize || attempt === 29) {
      // 写入文件
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, buffer);
      console.log(`✅ ${path.basename(inputPath)} → ${(buffer.length / 1024).toFixed(1)} KB`);
      // 如果循环结束仍未达标，记录警告
      if (attempt === 29) {
        console.warn(`⚠️  ${path.basename(inputPath)} 无法压缩至目标大小（当前尝试后仍 > ${targetSize/1024}KB）`);
      }
      return;
    }

    // 未达标：逐步调整参数
    if (outputFormat === 'png') {
      // PNG 主要靠压缩级别和尺寸，先降压缩级别（1~9，9最高压缩）
      if (compressionLevel > 1) {
        compressionLevel--;
      } else {
        // 压缩级别到 1 仍太大，则缩小尺寸
        scale *= 0.9;
        compressionLevel = 9; // 重置压缩级别
      }
    } else {
      // JPEG / WebP / AVIF 主要靠质量
      if (quality > 10) {
        quality -= 5;
      } else {
        // 质量已最低，缩小尺寸
        scale *= 0.9;
        quality = 90; // 重置质量，继续尝试
      }
    }
  }
}

/**
 * 递归遍历目录，处理所有图片
 * @param {string} srcDir   - 源目录
 * @param {string} destDir  - 目标目录
 * @param {number} targetSize - 目标大小（字节）
 */
async function processDirectory(srcDir, destDir, targetSize) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // 递归处理子目录
      await processDirectory(srcPath, destPath, targetSize);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTS.has(ext)) {
        await compressImage(srcPath, destPath, targetSize);
      } else {
        // 非图片文件直接复制（可选）
        // 这里默认跳过，如需复制可取消注释：
        // await fs.mkdir(path.dirname(destPath), { recursive: true });
        // await fs.copyFile(srcPath, destPath);
      }
    }
  }
}

// ---------- 命令行入口 ----------
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('用法: node compress-images.js <源目录> <目标目录> [目标大小(KB)]');
    console.error('示例: node compress-images.js ./photos ./compressed 100');
    process.exit(1);
  }

  const srcDir = path.resolve(args[0]);
  const destDir = path.resolve(args[1]);
  const targetSizeKB = parseInt(args[2], 10) || 100;
  const targetSize = targetSizeKB * 1024;

  try {
    await fs.access(srcDir);
  } catch {
    console.error(`❌ 源目录不存在: ${srcDir}`);
    process.exit(1);
  }

  console.log(`📂 源目录: ${srcDir}`);
  console.log(`📁 目标目录: ${destDir}`);
  console.log(`🎯 目标大小: ${targetSizeKB} KB`);

  await processDirectory(srcDir, destDir, targetSize);
  console.log('✨ 处理完成！');
}

// 如果直接运行该脚本
if (require.main === module) {
  main().catch(err => {
    console.error('💥 发生错误:', err);
    process.exit(1);
  });
}