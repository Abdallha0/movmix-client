function HeartFill({ size, color }: { size: number, color?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color || "currentColor"} className="heart-fill" viewBox="0 0 16 16">
      <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#bb0000" />
      <stop offset="100%" stopColor="orange" />
    </linearGradient>
  </defs>

        <path fill="url(#grad)" fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
    </svg>
}

export default HeartFill
