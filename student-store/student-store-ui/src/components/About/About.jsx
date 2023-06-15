import * as React from "react" 

export default function About(){
    return (
        <div style={{display: "flex", flexDirection: "column", width: "92.5%", alignItems: "center", marginLeft:"7.5%"}}>
        <div id={"about"}
          style={{
            display:"flex",
            width: "80%",
            height: "50vh",
            backgroundColor: "yellow",
            marginBottom: "10%",
            marginTop: "5%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px"
            
          }}
        >
          <h1>
            THIS IS MY ABOUT BANNER{" "}
          </h1>
        </div> 
        <div
        id={"contact"}
        style={{
          display:"flex",
          width: "100%",
          height: "75vh",
          backgroundColor: "green",
          marginBottom: "0",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
          <h1>This is my footer</h1>
      </div>
        </div>
    )
}