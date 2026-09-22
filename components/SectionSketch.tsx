type SectionSketchVariant = "orbit" | "book" | "journal";

type SectionSketchProps = {
  variant: SectionSketchVariant;
};

export function SectionSketch({ variant }: SectionSketchProps) {
  return (
    <svg
      className="section-sketch"
      viewBox="0 0 180 150"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {variant === "orbit" ? (
        <>
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <ellipse cx="90" cy="75" rx="68" ry="25" transform="rotate(-18 90 75)" />
            <ellipse cx="90" cy="75" rx="54" ry="42" transform="rotate(34 90 75)" />
            <ellipse cx="90" cy="75" rx="38" ry="58" transform="rotate(72 90 75)" />
            <circle cx="90" cy="75" r="11" />
            <path d="M85 75h10M90 70v10" />
          </g>
          <g fill="currentColor">
            <circle cx="28" cy="39" r="1.2" />
            <circle cx="145" cy="28" r="1" />
            <circle cx="157" cy="112" r="1.3" />
            <circle cx="45" cy="119" r="0.9" />
          </g>
        </>
      ) : null}

      {variant === "book" ? (
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M90 35c-13-9-31-11-52-5v71c20-6 38-4 52 5 14-9 32-11 52-5V30c-21-6-39-4-52 5Z" />
          <path d="M90 35v71M43 48c16-4 31-1 42 6M43 62c16-4 31-1 42 6M43 77c16-4 31-1 42 6M137 48c-16-4-31-1-42 6M137 62c-16-4-31-1-42 6M137 77c-16-4-31-1-42 6" />
          <path d="M38 102c19-6 36-4 52 5M142 102c-19-6-36-4-52 5" />
        </g>
      ) : null}

      {variant === "journal" ? (
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M32 36h116M32 57h116M32 78h116M32 99h116M32 120h116" />
          <path d="M52 25v101M128 25v101" />
          <circle cx="90" cy="57" r="14" />
          <path d="M90 43v14l9 7M90 57 81 67M90 71v29" />
          <path d="M85 100h10M82 107h16" />
        </g>
      ) : null}
    </svg>
  );
}
