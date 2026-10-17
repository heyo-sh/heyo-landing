function PromiseFigure({
  theme,
  title,
}: {
  theme: "dark" | "light";
  title: string;
}) {
  return (
    <iframe
      className="block aspect-[5/4] w-full border-0"
      loading="eager"
      src={`/hairline/figure-embed.html?figure=conduit&theme=${theme}`}
      title={title}
    />
  );
}

export function PromiseFigures({ theme }: { theme: "dark" | "light" }) {
  return (
    <>
      <div className="w-full xl:absolute xl:left-0 xl:top-1/2 xl:w-[24%] xl:-translate-y-1/2 2xl:w-[28%]">
        <PromiseFigure
          theme={theme}
          title="Left-hand connections gathering toward the centre; hover to lift a contact"
        />
      </div>
      <div className="w-full -scale-x-100 xl:absolute xl:right-0 xl:top-1/2 xl:w-[24%] xl:-translate-y-1/2 2xl:w-[28%]">
        <PromiseFigure
          theme={theme}
          title="Right-hand connections gathering toward the centre; hover to lift a contact"
        />
      </div>
    </>
  );
}
