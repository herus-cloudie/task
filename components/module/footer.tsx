import Image from "next/image"

const Footer = () => {
  return (
    <section className="w-full flex justify-center items-center relative bottom-0">
        <Image alt="footer" width={1220} height={1220} src={'/img/footer-mobile.svg'} className="sm:hidden w-full" />
        <Image alt="footer" width={1220} height={1220} src={'/img/footer.svg'} className="sm:block hidden w-full"/>
    </section>
  )
}

export default Footer