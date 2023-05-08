import { useRouter } from 'next/router'
import { BASE_URL } from "../../const";

export default function Search_Widget({  }) {

    const router = useRouter()
    
    const searchTag = (e) => {
        const tag = document.querySelector('#searchTag').value;
        if(!tag){
            alert('入力してください。');
            return false;
        }
        const href = `${BASE_URL}/${tag}/`
        e.preventDefault();
        router.push(href);
    }


    return (
    <div className="card mb-4">
        <div className="card-header bg-dark text-white">Search</div>
        <div className="card-body">
            <div className="input-group">
                <input className="form-control" type="text" id="searchTag" placeholder="Enter search term..." defaultValue={router.query.name} aria-label="Enter search term..." aria-describedby="button-search" />
                <button className="btn btn-primary" id="button-search" type="button" onClick={searchTag}>Go!</button>
            </div>
        </div>
    </div>
    );
}