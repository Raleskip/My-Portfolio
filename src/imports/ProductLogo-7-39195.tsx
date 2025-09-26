import svgPaths from "./svg-h9og1iabuz";

function Bg() {
  return (
    <div className="absolute inset-0" data-name="BG">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 128 128"
      >
        <g id="BG">
          <path
            d={svgPaths.p26182600}
            fill="var(--fill-0, #1ECCB0)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div
      className="absolute bottom-[21.95%] left-[21.88%] right-[21.87%] top-1/4"
      data-name="Icon"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 72 68"
      >
        <g id="Icon">
          <path
            d={svgPaths.p25a86380}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function PsJioHealthhub() {
  return (
    <div
      className="overflow-clip relative rounded-[64px] shrink-0 size-32"
      data-name="ps_jio_healthhub"
    >
      <Bg />
      <Icon />
    </div>
  );
}

function WmJiohealthhubBeta() {
  return (
    <div
      className="h-20 relative shrink-0 w-[369.933px]"
      data-name=".wm_jiohealthhub_beta"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 370 80"
      >
        <g clipPath="url(#clip0_7_46732)" id=".wm_jiohealthhub_beta">
          <path
            d={svgPaths.p115e0200}
            fill="var(--fill-0, #141414)"
            id="Vector"
          />
        </g>
        <defs>
          <clipPath id="clip0_7_46732">
            <rect fill="white" height="80" width="369.933" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="Content"
    >
      <PsJioHealthhub />
      <WmJiohealthhubBeta />
    </div>
  );
}

function ProductLogo() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="product-logo"
    >
      <Content />
    </div>
  );
}

export default function ProductLogo1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-10 items-start justify-start p-0 relative size-full"
      data-name="Product Logo"
    >
      <ProductLogo />
    </div>
  );
}