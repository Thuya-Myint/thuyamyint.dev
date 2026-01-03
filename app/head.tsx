// app/head.tsx
export default function Head() {
  const title = "Thuya Myint – Developer Portfolio";
  const description = "Welcome to my portfolio and projects showcase.";
  const url = "https://www.thuyamyint.dev";
  const image = "https://www.thuyamyint.dev/assets/share.png"; // make sure this image exists

  return (
    <>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Thuya Myint" />

      {/* Twitter Card (no Twitter account needed) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Optional: favicon */}
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
