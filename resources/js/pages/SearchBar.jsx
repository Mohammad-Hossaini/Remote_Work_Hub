import "./searchBar.css";

function SearchBar() {
    return (
        <div className="main-container">
            <div className="content-container">
                <div className="text-container">
                    <h1 className="text-title">Find Exciting Jobs Today.</h1>
                    <p className="text-desc">
                        Get the most exciting jobs from all around the world and
                        grow your career fast with others.
                    </p>
                    <p className="pop-search">
                        <strong>Popular Search :</strong> Software Developer ,
                        UX Designer , Mobile Developer.
                    </p>
                </div>

                <div className="img-container">
                    <img
                        src="/bg-image_3_-removebg-preview.png"
                        alt=""
                        className="search-img"
                    />
                </div>
                <div className="search-container">
                    <form className="search-form">
                        <div className="first-input">
                            <label className="type-label">Type</label>
                            <input
                                type="text"
                                className="type-input"
                                placeholder="Enter job type!"
                            />
                        </div>
                        <div className="first-input">
                            <label className="type-label">Location</label>
                            <input
                                type="text"
                                className="type-input"
                                placeholder="Enter location!"
                            />
                        </div>
                    </form>

                    <div className="apply-buttons">
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
