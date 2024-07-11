interface Props {}

function ChevronLeft({}: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4L8 12L16 20"
        stroke="#739EE4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ChevronLeft;
