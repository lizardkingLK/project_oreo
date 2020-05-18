import React from 'react';
import axios from 'axios';

const ItemWindow = (props) => {
    let keyword = '';

    const getKeyword = (e) => {
        keyword = e.target.value;
    }

    const searchKeyword = async (e) => {
        e.preventDefault();
        if(keyword)
            await axios.post('/api/items/search', {keyword})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
    <div id="itemWindow">
        <div id="itemWindow_left">
            <div id="itemWindowL_topA">
                <h5 id="itemWindowLTopA_A">Categories</h5>
            </div>
            <div id="itemWindowL_topB">
                <div className="itemWindowLTopB_category">
                    {/* PRIMARY CATEGORIES */}
                    {/* SECONDARY CATEGORIES */}
                    {/* TERNARY CATEGORIES */}
                </div>
            </div>
        </div>
        <div id="itemWindow_right">
            <form onSubmit={searchKeyword} id="itemWindowR_topA">
                <input onChange={getKeyword} type="text" id="itemWindowRTopA_input" className="form-control form-control-sm"  placeholder="Search.." />
                <button type="submit" id="itemWindowRTopA_submit" className="btn btn-sm btn-outline-dark" value="OK"><i className="fa fa-search"></i></button>
            </form>
        </div>
    </div>
    )
}

export default ItemWindow;