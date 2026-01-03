// app/head.tsx
export default function Head() {
  const title = "Thuya Myint – Developer Portfolio";
  const description = "Welcome to my portfolio and projects showcase.";
  const url = "https://www.thuyamyint.dev";
  const image = "https://www.thuyamyint.dev/assets/share.png"; // Ensure this exists
  const imageWidth = 1200;
  const imageHeight = 630;

  return (
    <>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Thuya Myint" />

      {/* Explicit OG image */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />

      {/* Twitter Card (no account needed) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Optional: favicon */}
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
