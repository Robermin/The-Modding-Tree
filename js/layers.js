addLayer("p", {
    name: "particle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "particles", // Name of prestige currency
    baseResource: "universal points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 15)) mult = mult.times(upgradeEffect('p', 15))
        if (hasUpgrade('p', 23)) mult = mult.times(upgradeEffect('p', 23))
        if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
        if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
        if (hasUpgrade('p', 34)) mult = mult.times(1e9)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for particles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('p', 25)) return 1
        return 0
    },
    upgrades: {
        11: {
            title: "The beginning",
            description: "Double your universal point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Still the beginning",
            description: "Triple your universal point gain.",
            cost: new Decimal(3),
        },
        13: {
            title: "Literally the beginning",
            description: "Multiply your universal point gain by 5.",
            cost: new Decimal(10),
        },
        14: {
            title: "Start of the growth",
            description: "Boost universal point gain based on particles.",
            cost: new Decimal(30),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "The growth",
            description: "Current universal point boost particle gain.",
            cost: new Decimal(80),
            effect() {
                return player.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "Big Bang",
            description: "Multiply universal point by 1e3.",
            cost: new Decimal(1000)
        },
        22: {
            title: "The expansion",
            description: "Boost universal point gain by itself.",
            cost: new Decimal(2e6),
            effect() {
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "Further expansion",
            description: "Boost particle gain by itself.",
            cost: new Decimal(3e8),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        24: {
            title: "Huge expansion",
            description: "Boost particle gain even more.",
            cost: new Decimal(1e12),
            effect() {
                return player.points.add(1).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        25: {
            title: "Infinite Expansion",
            description: "Gain 100% of particle gain per second.",
            cost: new Decimal(1e42)
        },
        31: {
            title: "A new era",
            description: "Boost universal point gain by log2(particle)",
            cost: new Decimal(1e56),
            effect() {
                return player[this.layer].points.add(1).log2(player[this.layer].points)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        32: {
            title: "Keep going",
            description: "Boost universal point gain by itself again.",
            cost: new Decimal(1e80),
            effect() {
                return player.points.add(1).pow(0.07)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        33: {
            title: "Just keep move on",
            description: "Boost particle gain by itself again.",
            cost: new Decimal(5e180),
            effect() {
                return player[this.layer].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        34: {
            title: "It doesn't stop",
            description: "Multiply particle gain by 1e9.",
            cost: new Decimal(5e265)
        },
        35: {
            title: "It begins.",
            description: "Unlock a new layer.",
            cost: new Decimal("1e500")
        }
    },
})