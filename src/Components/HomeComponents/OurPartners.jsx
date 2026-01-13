import { useRef, useEffect } from "react"
import gsap from "gsap"

const partners = [
    {
        id: "blockradar",
        img: "/icons/blockradar.svg",
    },
    {
        id: "fincra",
        img: "/icons/fincra.svg",
    },
    {
        id: "dojah",
        img: "/icons/dojah.svg",
    },
    {
        id: "arbitrum",
        img: "/icons/arbitrum.svg",
    },
    {
        id: "paycrest",
        img: "/icons/paycrest.svg",
    },
    {
        id: "cngn",
        img: "/icons/cngn.svg",
    },
]

export default function Partners() {

    const listRef = useRef(null)

    useEffect(() => {
        const list = listRef.current;
        const items = list.children;

        let totalWidth = 0;

        Array.from(items).forEach((item) => {
        totalWidth += item.offsetWidth;
        });

        gsap.to(items, {
        x: `-=${totalWidth / 2}`,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: (x) => {
            return `${parseFloat(x) % (totalWidth / 2)}px`;
            }
        }
        });
    }, []);

    return (
        <section className="bg-white w-full mx-auto px-4 lg:px-23.5 space-y-10 pt-8 lg:pt-12">
            <div className="space-y-2">
                <h5 className="text-[#636363]">Our Partners</h5>
                <hr className="w-full border border-[#F6F6F6]" />
            </div>

            {/* PARTNERS */}
            <ul ref={listRef} className="flex items-center gap-10 lg:gap-25.25 overflow-hidden animate">
                {[...partners, ...partners].map((partner, index) => (
                    <li key={`${partner.key}-${index}`} className="flex-none">
                        <figure className="grayscale-100">
                            <img src={partner.img} alt={`${partner.id} icon`}  className="block" />
                        </figure>
                    </li>
                ))}
            </ul>
        </section>
    )
}