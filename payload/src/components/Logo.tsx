import Image from 'next/image'
import LogoImg from '../assets/logo.png'

export default function Logo() {
  return <Image src={LogoImg.src} alt="koston logo" width={200} height={200} />
}