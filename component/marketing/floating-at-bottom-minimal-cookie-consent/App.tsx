import React from "react";
import {Button, Link} from "@heroui/react";

export default function Component() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-[21px] pb-[26px]">
      <div className="pointer-events-auto flex w-full items-center justify-between gap-x-20 rounded-large border border-divider bg-background/15 px-6 py-4 shadow-small backdrop-blur">
        <p className="text-small font-normal text-default-700">
          We use cookies to provide the best experience. By continuing to use our site, you agree to
          our&nbsp;
          <Link className="font-normal" href="#" size="sm" underline="hover">
            Cookie Policy.
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <Button
            className="px-4 font-medium"
            radius="lg"
            style={{
              border: "solid 2px transparent",
              backgroundImage: `linear-gradient(hsl(var(--heroui-background)), hsl(var(--heroui-background))), linear-gradient(83.87deg, #F54180, #9353D3)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            Accept All
          </Button>
          <Button className="font-medium" radius="lg" variant="light">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
