import { Button } from "./button";

export default function RequestDemo({ className="" }) {
  return (
    <>
      <Button
        className={` relative z-30 ${className}`}
        size="lg"
        onClick={() => {window.open("https://zenfipay.zohobookings.com/#/4757755000000049052", "_blank") }}
      >
        Request a demo
      </Button>
    </>
  )
}
