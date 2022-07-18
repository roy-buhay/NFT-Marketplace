import { useMyItems, useMyHistory } from "@hooks/index";

const Activity:React.FC = () => {
  // const { history } = useMyHistory()
  return (
    <>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-5 text-white text-sm font-light mb-4">
          <span>Event</span>
          <span>Price</span>
          <span>From</span>
          <span>To</span>
          <span>Date</span>
        </div>
        <div className="flex flex-col items-start justify-start space-y-1 w-full">
          {/*{
            history && history.length > 0 ? history.slice(0, 10).map(d => {
            return  <div className="grid grid-cols-5 gap-y-1 text-sm w-full bg-white p-4">
                <span>
                    Sale
                </span>
                <span className="flex items-center space-y-2">
                    <img src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg" className="w-2.5 mr-2" /> 
                    {parseInt(d.value)}
                </span>
                <Link href="">
                    <a className="underline">{d.from.substr(0, 8)}</a>
                </Link>
                <Link href="">
                    <a className="underline">{d.to.substr(0, 8)}</a>
                </Link>
                <span>
                    {d.timestamp}
                </span>
                </div>
            }) : <p> No transactions yet. </p>
        }*/}
        </div>
      </div>
    </>
  );
}
export default Activity