import '@/styles/waves.css'; // Import the CSS file

const Wave = () => {
  return (
    <div className="waves absolute top-0 left-0 w-full h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 25 150 28"
        preserveAspectRatio="none"
        className="w-full h-[10vh]"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            stroke="rgba(255,255,255,0.7)"
            fill="transparent"
            strokeWidth="1"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            stroke="rgba(255,255,255,0.5)"
            fill="transparent"
            strokeWidth="1"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            stroke="rgba(255,255,255,0.3)"
            fill="transparent"
            strokeWidth="1"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            stroke="rgba(255,255,255,0.5)"
            fill="transparent"
            strokeWidth="1"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="9"
            stroke="#808080"
            fill="transparent"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
};

export default Wave;

// const Wave = () => {
//   return (
//     <div className="waves absolute top-0 left-0 w-full h-full">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         // viewBox="0 24 150 28"
//         viewBox="0 25 150 28"
//         preserveAspectRatio="none"
//         className="w-full h-[10vh]"
//       >
//         <defs>
//           <path
//             id="gentle-wave"
//             d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
//           />
//         </defs>
//         <g className="parallax">
//           <use
//             xlinkHref="#gentle-wave"
//             x="48"
//             y="0"
//             fill="rgba(255,255,255,0.7)"
//           />
//           <use
//             xlinkHref="#gentle-wave"
//             x="48"
//             y="3"
//             fill="rgba(255,255,255,0.5)"
//           />
//           <use
//             xlinkHref="#gentle-wave"
//             x="48"
//             y="5"
//             fill="rgba(255,255,255,0.3)"
//           />
//           <use
//             xlinkHref="#gentle-wave"
//             x="48"
//             y="7"
//             fill="rgba(255,255,255,0.5)"
//           />
//           <use xlinkHref="#gentle-wave" x="48" y="9" fill="#808080" />
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default Wave;
