// This cord is fro written in moralis cloud function.
Moralis.Cloud.define("getWL", async (version) => {
    let WhiteListAddress;
    if (version == 1){
        WhiteListAddress = [
            // WhiteListAddress here.
        ];
    } else {
        WhiteListAddress = [];
    }
    return(WhiteListAddress);
})