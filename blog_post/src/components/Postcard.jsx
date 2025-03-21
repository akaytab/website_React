/* eslint-disable react/prop-types */
import { Link } from "react-router";
import { service } from "../services/configAppwrite";


function Postcard({$id,title,featuredImage}){
    return(
        <Link to={`/post/${$id}`}>
            <div className="w-full rounded-xl bg-gray-100">
                <div className="w-full justify-center mb-4">
                    <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-xl"/>
                </div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default Postcard