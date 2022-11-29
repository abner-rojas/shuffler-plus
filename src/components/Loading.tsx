import loadingDiamond from '../assets/loading-diamond.gif'
import q4Logo from '../assets/q4.svg'

export default function Loading({show} : {show:boolean}){

    return (
        <div className={!show ? "loading fade-out disabled" : "loading"}>
            <div className="logo">
                <svg x="0px" y="0px" viewBox="0 0 336.8 358">
                <path className="logo-0" d="M336.8,159.3l-21.8,92.3l-13.8-17.7L282,248.8c-11.7,9.1-26.3,14.9-41.9,16.6c-3.1,0.4-6.2,0.5-9.3,0.6
                    c-19,0.2-37.3-5.5-51.5-16.1v0L107.2,196c-2.7-2-10.3-1.9-13,0.1l-48.8,38L0,175.9l48.8-38c14-10.9,32.2-17,51.2-17.2
                    c19-0.2,37.3,5.5,51.5,16.1l72.2,53.9c0.2,0.1,0.4,0.2,0.6,0.4c3.1,1.6,9.9,1.4,12.4-0.5l19.1-14.9l-13.8-17.7L336.8,159.3z"/>
                <path className="logo-1" d="M216.8,220.7c6.8,16.4,7.9,35.5,3.1,53.9c-4.8,18.4-15.2,34.5-29.2,45.4L142,358l-45.5-58.3l48.8-38
                    c2.7-2.1,4.6-9.5,3.3-12.6L114,166c-6.8-16.4-7.9-35.5-3.1-53.9c4.8-18.4,15.2-34.5,29.2-45.4l19.1-14.9l-13.8-17.7l94.8,1.4
                    l-21.8,92.3l-13.8-17.7L185.5,125c-2.7,2.1-4.6,9.5-3.3,12.5L216.8,220.7z"/>
                <g>
                    <path className="logo-2" d="M267.9,24.1h23.9V0h20.2v24.1h24.1v20.2h-24.1v23.9h-20.2V44.2h-23.9V24.1z"/>
                </g>
                </svg>
            </div>
            <div className="images">
                <img src={loadingDiamond} alt="Loading Diamond!" />
                <img src={q4Logo} className="q4" alt="Q4 Logo" />
            </div>
        </div>
    )
}