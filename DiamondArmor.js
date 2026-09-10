// Diamond Join Armor Mod for Eaglercraft
// Gives the player full diamond armor when joining

(function() {
    console.log("[Diamond Armor Mod] Loaded");

    function giveDiamondArmor() {
        try {
            if (!window.minecraft) return;

            let mc = window.minecraft;

            if (!mc.thePlayer) return;

            let player = mc.thePlayer;

            let armor = [
                "diamond_helmet",
                "diamond_chestplate",
                "diamond_leggings",
                "diamond_boots"
            ];

            for (let i = 0; i < armor.length; i++) {
                let item = mc.getItemFromName(armor[i]);

                if (item) {
                    let stack = new mc.ItemStack(item);
                    
                    // Armor slots:
                    // 3 Helmet
                    // 2 Chestplate
                    // 1 Leggings
                    // 0 Boots
                    player.inventory.armorInventory[3 - i] = stack;
                }
            }

            console.log("[Diamond Armor Mod] Diamond armor equipped!");

        } catch(e) {
            console.log("[Diamond Armor Mod Error]", e);
        }
    }


    // Wait until game loads
    let check = setInterval(function() {

        if (
            window.minecraft &&
            window.minecraft.thePlayer
        ) {
            giveDiamondArmor();
            clearInterval(check);
        }

    }, 1000);


})();
