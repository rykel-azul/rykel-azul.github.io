picker_version = "0.1";
document.getElementById("picker_version").textContent = picker_version;

const item = "assets/minecraft/items/";

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("createZip");

    if (!button) return;

    button.addEventListener("click", createZip())
    
    async function createZip() {
        try {
        const zip = new JSZip();

        const presetFiles = [
            "pack.mcmeta"
        ];
    
        for (const filename of presetFiles) {
            const response = await fetch(`./preset/${filename}`);
    
            if (!response.ok) {throw new Error(`Could not load ${filename}`);}
    
            const content = await response.text();
    
            zip.file(filename, content);
        }

        zip.file(item + "carved_pumpkin", "pump")


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