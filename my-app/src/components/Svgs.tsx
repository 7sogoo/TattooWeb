export const SvgSearchIcon = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 64 64"
  >
    <linearGradient
      id="C4TdsG345VslfSD6bqYyXa_44045_gr1"
      x1="20.499"
      x2="20.499"
      y1="13.001"
      y2="23.584"
      gradientUnits="userSpaceOnUse"
      spreadMethod="reflect"
    >
      <stop offset="0" stopColor="#6dc7ff"></stop>
      <stop offset="1" stopColor="#e6abff"></stop>
    </linearGradient>
    <path
      fill="url(#C4TdsG345VslfSD6bqYyXa_44045_gr1)"
      d="M25,14.001c-5,0-9.002,3.999-9.002,8.999H25V14.001z"
    ></path>
    <linearGradient
      id="C4TdsG345VslfSD6bqYyXb_44045_gr2"
      x1="24.511"
      x2="26.011"
      y1="5.27"
      y2="59.777"
      gradientUnits="userSpaceOnUse"
      spreadMethod="reflect"
    >
      <stop offset="0" stopColor="#1a6dff"></stop>
      <stop offset="1" stopColor="#c822ff"></stop>
    </linearGradient>
    <path
      fill="url(#C4TdsG345VslfSD6bqYyXb_44045_gr2)"
      d="M24.999,10c-7.169,0-13.002,5.832-13.002,13.002s5.833,13.002,13.002,13.002 s13.002-5.832,13.002-13.002S32.168,10,24.999,10z M24.999,34.003c-6.066,0-11.001-4.935-11.001-11.001s4.935-11.001,11.001-11.001 s11.001,4.935,11.001,11.001S31.065,34.003,24.999,34.003z"
    ></path>
    <linearGradient
      id="C4TdsG345VslfSD6bqYyXc_44045_gr3"
      x1="31.109"
      x2="32.609"
      y1="5.089"
      y2="59.595"
      gradientUnits="userSpaceOnUse"
      spreadMethod="reflect"
    >
      <stop offset="0" stopColor="#1a6dff"></stop>
      <stop offset="1" stopColor="#c822ff"></stop>
    </linearGradient>
    <path
      fill="url(#C4TdsG345VslfSD6bqYyXc_44045_gr3)"
      d="M54.77,48.559l-8.752-9.864c-0.719-0.812-1.995-0.92-2.845-0.243l-2.486,1.973l-4.125-4.994 c3.337-3.106,5.439-7.521,5.439-12.429C42.001,13.627,34.374,6,24.999,6S7.997,13.627,7.997,23.002s7.627,17.002,17.002,17.002 c3.749,0,7.207-1.234,10.021-3.298l4.099,4.963l-2.366,1.877c-0.434,0.344-0.698,0.832-0.746,1.374 c-0.047,0.539,0.127,1.06,0.49,1.469l8.753,9.865C46.272,57.406,47.739,58,49.215,58c1.169,0,2.344-0.373,3.307-1.137l1.607-1.274 c1.08-0.858,1.739-2.068,1.856-3.406C56.1,50.859,55.669,49.572,54.77,48.559z M9.997,23.002C9.997,14.73,16.727,8,24.999,8 s15.002,6.73,15.002,15.002s-6.729,15.002-15.002,15.002S9.997,31.274,9.997,23.002z M48.642,44.666l-6.467,5.133l-1.477-1.656 l6.472-5.136L48.642,44.666z M44.418,40.018c0.013-0.01,0.03-0.014,0.049-0.014c0.022,0,0.045,0.007,0.055,0.018l1.319,1.487 l-6.476,5.139l-1.368-1.534L44.418,40.018z M52.885,54.022l-1.607,1.274c-1.361,1.081-3.394,0.915-4.532-0.369l-3.239-3.632 l6.464-5.13l3.303,3.722c0.53,0.598,0.785,1.351,0.718,2.122C53.924,52.795,53.53,53.51,52.885,54.022z"
    ></path>
  </svg>
  )
}

interface SvgInstagramProps {
  strokeColor: string;
}

export const SvgInstagram = ({strokeColor} : SvgInstagramProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  )
}

export const SvgFacebook = ({strokeColor} : SvgInstagramProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )
}

export const SvgLinkedin = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  )
}

export const SvgEye = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
  )
}

export const SvgEyeClosed = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
  )
}

export const SvgDown = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-right"><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>
)
}