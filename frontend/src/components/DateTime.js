import React from "react";

var datetime = () => {

    var showdate = new Date();
    var displaytodaydate = showdate.getDate() + '-' + showdate.getMonth() + '-' + showdate.getFullYear();
    var dt = showdate.toDateString();
    var displaytime = showdate.getHours() + ":" + showdate.getMinutes() + ":" + showdate.getSeconds();

    return (

        <div className="date-time">

            <center><h4>{dt} <span>||</span> {displaytime}</h4></center>

        </div>
    );
}

export default datetime;