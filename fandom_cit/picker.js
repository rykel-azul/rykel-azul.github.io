picker_version = "0.1";
document.getElementById("picker_version").textContent = picker_version;
resourcepack_version = "1.2.0";
document.getElementById("resourcepack_version").textContent = resourcepack_version;
game_version = "26.3";
document.getElementById("game_version").textContent = game_version;

const item = "assets/minecraft/items/";

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("createZip");
    button.addEventListener("click", (event) => {createZip()});

    async function createZip() {
        try {
        const zip = new JSZip();
        var img = zip;

        const requiredFiles = [
            "pack.mcmeta",
            "pack.png"
        ];

        for (const filename of requiredFiles) {
            const response = await fetch(`./picker-presets/r${resourcepack_version}/${filename}`);
    
            if (!response.ok) {throw new Error(`Could not load ./picker-presets/r${resourcepack_version}/${filename}`);}
    
            const content = await response.text();
            // if (filename.includes(".png")){
            //    img.file(filename, imgData, {base64: true});
            // } else {
                zip.file(filename, content);
            // } 
        }
        
        const presetItems = [
            "carved_pumpkin",
            "crossbow",
            "diamond_sword",
            "netherite_sword",
            "totem_of_undying"
        ];

        for (const itemname of presetItems){
            if (document.getElementById("default-" + itemname).value != "default"){
                console.error(itemname + " " + document.getElementById("default-" + itemname).value)
                const chosenModel = document.getElementById("default-" + itemname).value
                const response = await fetch(`./picker-presets/r${resourcepack_version}/${itemname}.json`);
                if (!response.ok) {throw new Error(`Could not load ./picker-presets/r${resourcepack_version}/${filename}`)}
                let content = await response.text();
                const defaultItem = "minecraft:item/" + itemname
                const defaultBlock = "minecraft:block/" + itemname
                const newContent = "fandom_cit:" + chosenModel
                content = content.replaceAll(defaultItem, newContent);
                content = content.replaceAll(defaultBlock, newContent);
                zip.file(`${item}${itemname}.json`, content)
            }
        }


        const blob = await zip.generateAsync({type:"blob"});
        const url = URL.createObjectURL(blob); //creates url for the zip
        const link = document.createElement("a"); //creates a link object
        link.href = url; //directs the link to the url
        link.download = "§bFandom §lCIT§r §8§o[p" + picker_version + "].zip"; //zip name
        link.click(); //"clicks" the link
        URL.revokeObjectURL(url);
      } catch (error) {
          console.error("Failed to create ZIP:", error);
        }
    };
});