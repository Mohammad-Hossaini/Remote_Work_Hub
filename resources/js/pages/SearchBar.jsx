import "./searchBar.css";
function SearchBar() {
    return (
        <div className="main-container">
            <div className="content-container">
                <div className="text-container">
                    <h1 className="text-title">Find Exciting Jobs Today.</h1>
                    <p className="text-desc">
                        Get the most sxciting jobs from all around the world and
                        grow your career fast with others.
                    </p>
                    <p className="pop-search">
                        <strong>Popular Search :</strong> Software Developer ,
                        UX Designer Mobile Developer.
                    </p>
                </div>
                <div className="img-container">
                    <img src="bg-image(3).png" alt="" className="search-img" />
                </div>
                <div className="search-container">
                    <form action="">
                        <div className="first-input">
                            <label htmlFor="" className="type-label">
                                Type
                            </label>
                            <br />
                            <input
                                type="text"
                                className="type-input"
                                placeholder="Enter job type!"
                            />
                        </div>
                    </form>
                    <div className="buttons">
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
