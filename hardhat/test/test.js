const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

describe("main", () => {
    let owner, alice, bob, WGMFactory721, WGM721, WGMFactory1155, WGM1155, whitelistAddresses, tx, clamingAddress, hexPloof
    before(async () => {
        owner = (await ethers.getSigners())[0]
        alice = (await ethers.getSigners())[1]
        bob = (await ethers.getSigners())[2]

        WGMFactory721 = await ethers.getContractFactory("ERC721Mock")
        WGMFactory1155 = await ethers.getContractFactory("ERC1155Mock")

        WGM721 = await WGMFactory721.deploy(
            "WAGMI Music",
            "disc"
        )
        WGM1155 = await WGMFactory1155.deploy(
            "WAGMI Music",
            "disc"
        )

        whitelistAddresses = [owner.address, alice.address, bob.address];
        const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
        const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
        const rootHash = merkleTree.getRoot();
    })

    describe("Normal method for ERC721", () => {
        before(async () => {
            tx = await WGMFactory721.setMerkleRoot(rootHash);
            await tx.wait();
            hexPloof = merkleTree.getHexProof(keccak256(alice.address));
        })
        describe("switch saleStates", () => {
            it("can't mint when sales is suspended", async() => {
                await expect(WGMFactory721.mint(1, { value: ethers.utils.parseEther("0.05") })).to.be.revertedWith("NFTs are not now on sale");
            })
            it("can't premint until presale is started", async() => {
                await expect(WGMFactory721.connect(alice).whitelistMint(1, hexPloof, { value: ethers.utils.parseEther("0.01") })).to.be.revertedWith("NFTs are not now on sale");
                tx = await WGMFactory721.startPresale();
                await tx.wait();
                tx = await WGMFactory721.connect(alice).whitelistMint(1, { value: ethers.utils.parseEther("0.01") });
                await tx.wait();
                expect(WGMFactory721.ownerOf(1)).to.be.equal(alice.address);
            })
        })
        describe("presales for whitelisted", () => {
            before(async () => {
                tx = await WGMFactory721.startPresale();
                await tx.wait();
            })
            it("it shouldn't be passed when not whitelisted", async() => {
                await expect(WGMFactory721.connect(bob.address).whitelistMint(1, hexPloof, { value: ethers.utils.parseEther("0.01") })).to.be.revertedWith("Invalid Merkle Proof.")
            })
            it("it shouldn't be passed when msg.value is incorrect", async() => {
                await expect(WGMFactory721.connect(alice.address).whitelistMint(1, hexPloof, { value: ethers.utils.parseEther("1") })).to.be.revertedWith("value is incorrect")               
            })
            it("it should be passed when fully prepared", async() => {
                tx = await WGMFactory721.connect(alice.address).whitelistMint(1, hexPloof, { value: ethers.utils.parseEther("0.01")});
                await tx.wait();
                expect(WGMFactory721.ownerOf(1)).to.be.equal(alice.address);
            })
        })
        describe("public mint sales", () => {
            before(async () => {
                tx = await WGMFactory721.startPublicSale();
                await tx.wait();
            })
            it("it shouldn't be passed when msg.value is incorrect", async() => {
                await expect(WGMFactory721.connect(alice.address).mint(1, { value: ethers.utils.parseEther("1") })).to.be.revertedWith("value is incorrect")               
            })
            it("it shouldn't be passed when max supply reached", async() => {
            })
            it("it should be passed when fully prepared", async() => {
                tx = await WGMFactory721.connect(bob.address).mint(1, { value: ethers.utils.parseEther("0.05")});
                await tx.wait();
                expect(WGMFactory721.ownerOf(1)).to.be.equal(bob.address);
            })
        })
        describe("airdrop", () => {
            it("this function can be called by only owner", async() => {
                await expect(WGMFactory721.connect(alice).mintByOwner([1, 2], [owner.address, owner.address])).to.be.revertedWith("This is not allowed except for _creator or agent");
            })
            it("balk mint is on track", async() => {
                tx = await WGMFactory721.mintByOwner([1, 2], [owner.address, owner.address]);
                await tx.wait();
                expect(WGMFactory721.ownerOf(2)).to.be.revertedWith(owner.address)
            })
        })
        describe("withdrow Revenue", () => {
            before(async () => {
                tx = await WGMFactory721.startPublicSale();
                await tx.wait();
            })
            it("this function can be called by only owner", async() => {
                await expect(WGMFactory721.connect(alice).withdraw(alice.address)).to.be.revertedWith("This is not allowed except for _creator or agent");
            })
            it("all balance should be transfered for owner", async() => {
                tx = await WGMFactory721.withdraw(alice.address);
                await tx.wait()
                expect(balanceOf(alice))
            })
        })
    })

    describe("Normal method for ERC1155", () => {
        describe("switch saleStates", () => {
            it("can't mint when sales is suspended", async() => {

            })
            it("can't premint until presale is started", async() => {

            })
        })
        describe("presales for whitelisted", () => {
            it("it shouldn't be passed when not whitelisted", async() => {
                
            })
            it("it shouldn't be passed when msg.value is incorrect", async() => {
                
            })
            it("it should be passed when fully prepared", async() => {
                
            })
        })
        describe("public mint sales", () => {
            it("it shouldn't be passed when msg.value is incorrect", async() => {
                
            })
            it("it shouldn't be passed when max supply reached", async() => {
                
            })
            it("it should be passed when fully prepared", async() => {
                
            })
        })
        describe("airdrop", () => {
            it("this function can be called by only owner", async() => {
                
            })
            it("balk mint is on track")
        })
        describe("withdrow Revenue", () => {
            it("this function can be called by only owner", async() => {
                
            })
            it("all balance should be transfered for owner", async() => {
                
            })
        })
    })
    describe("Revenue Pool test", () => {
        it("each share must be keeped even withdrawal become complex", async() => {
                
        })
    })
})