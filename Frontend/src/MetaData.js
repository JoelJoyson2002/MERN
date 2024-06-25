import { Helmet } from "react-helmet-async";
const MetaData=({title})=>{
   

    return(
          <Helmet>
              <title>{`${title}-HomeService`}</title>

          </Helmet>
    )
}


export default MetaData;