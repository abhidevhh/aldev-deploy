import { jsx } from "react/jsx-runtime";
function CloudinaryVideo({
  className,
  width = 1e3,
  height,
  aspectRatio,
  crop = "fill",
  cloudinaryId
}) {
  const transforms = [
    `f_auto:video`,
    `q_auto`,
    `c_${crop}`,
    `ac_none`,
    aspectRatio ? `ar_${aspectRatio}` : null,
    `w_${width}`,
    height ? `h_${height}` : null,
    "fl_keep_dar"
  ].filter(Boolean).join(",");
  return /* @__PURE__ */ jsx(
    "video",
    {
      className,
      autoPlay: true,
      src: `https://res.cloudinary.com/abhidev-com/video/upload/${transforms}/${cloudinaryId}`,
      muted: true,
      loop: true,
      controls: false,
      style: {
        width: "100%",
        ...aspectRatio ? { aspectRatio: aspectRatio.replace(":", "/") } : {}
      }
    }
  );
}
export {
  CloudinaryVideo as C
};
//# sourceMappingURL=cloudinary-video-DeT-8neH.js.map
