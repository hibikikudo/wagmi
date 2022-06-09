const { expect } = require("chai")
const { config } = require("dotenv")
const { ethers, waffle } = require("hardhat")
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const provider = waffle.provider;

describe("main", () => {
    let owner, alice, bob, WGMFactory721, WGM721, WGMFactory1155, WGM1155, 
    whitelistAddresses, tx, clamingAddress, hexPloof, leafNodes, merkleTree, rootHash, 
    ERC20
    beforeEach(async () => {
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
        leafNodes = whitelistAddresses.map(addr => keccak256(addr));
        merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
        rootHash = merkleTree.getRoot();
    })

    describe("Normal method for ERC721", () => {
        beforeEach(async () => {
            tx = await WGM721.setMerkleRoot(rootHash);
            await tx.wait();
            hexPloof = merkleTree.getHexProof(keccak256(alice.address));
        })
        describe("switch saleStates", () => {
            xit("can't mint when sales is suspended", async() => {
                await expect(WGM721.mint({ value: ethers.utils.parseEther("1") })).to.be.revertedWith("NFTs are not now on sale");
            })
            xit("can't premint until presale is started", async() => {
                let balance0 = await provider.getBalance(alice.address);
                console.log("balance0",ethers.utils.formatEther(balance0))

                await expect(WGM721.connect(alice).whitelistMint(hexPloof, { value: ethers.utils.parseEther("1") })).to.be.revertedWith("NFTs are not now on sale");
                tx = await WGM721.startPresale();
                await tx.wait();
                tx = await WGM721.connect(alice).whitelistMint(hexPloof, { value: ethers.utils.parseEther("1") });
                await tx.wait();

                let balance = await provider.getBalance(alice.address)
                console.log("balance",ethers.utils.formatEther(balance))

                expect(await WGM721.ownerOf(0)).to.be.equal(alice.address);
            })
        })
        describe("presales for whitelisted", () => {
            beforeEach(async () => {
                tx = await WGM721.startPresale();
                await tx.wait();
            })
            xit("it shouldn't be passed when not whitelisted", async() => {
                await expect(WGM721.connect(bob).whitelistMint(hexPloof, { value: ethers.utils.parseEther("1") })).to.be.revertedWith("Invalid Merkle Proof.")
            })
            xit("it shouldn't be passed when msg.value is incorrect", async() => {
                await expect(WGM721.connect(alice).whitelistMint(hexPloof, { value: ethers.utils.parseEther("2") })).to.be.revertedWith("value is incorrect")               
            })
            xit("it should be passed when fully prepared", async() => {
                let balance0 = await provider.getBalance(alice.address);
                console.log("balance0",ethers.utils.formatEther(balance0))
                tx = await WGM721.connect(alice).whitelistMint(hexPloof, { value: ethers.utils.parseEther("1")});
                await tx.wait();
                expect(await WGM721.ownerOf(0)).to.be.equal(alice.address);
                let balance = await provider.getBalance(alice.address);
                console.log("balance",ethers.utils.formatEther(balance))
            })
        })
        describe("public mint sales", () => {
            beforeEach(async () => {
                tx = await WGM721.startPublicSale();
                await tx.wait();
            })
            xit("it shouldn't be passed when msg.value is incorrect", async() => {
                await expect(WGM721.connect(alice).mint({ value: ethers.utils.parseEther("2") })).to.be.revertedWith("value is incorrect")               
            })
            xit("it shouldn't be passed when max supply reached", async() => {
            })
            xit("it should be passed when fully prepared", async() => {
                tx = await WGM721.connect(bob).mint({ value: ethers.utils.parseEther("1")});
                await tx.wait();
                expect(await WGM721.ownerOf(0)).to.be.equal(bob.address);
                expect(await WGM721.tokenSupply()).to.be.equal(1);
            })
        })
        describe("airdrop", () => {
            xit("this function can be called by only owner", async() => {
                await expect(WGM721.connect(alice).mintByOwner([owner.address, owner.address])).to.be.revertedWith("This is not allowed except for _creator or agent");
            })
            xit("balk mint is on track", async() => {
                tx = await WGM721.mintByOwner([owner.address, owner.address]);
                await tx.wait();
                expect(WGM721.ownerOf(2)).to.be.equal(owner.address)
            })
        })
        describe("withdrow Revenue", () => {
            beforeEach(async () => {
                tx = await WGM721.startPublicSale();
                await tx.wait();
                tx = await WGM721.connect(alice).mint({ value: ethers.utils.parseEther("1")});
                await tx.wait();
                // somethig wrong...
                // tx = await provider.sendTransaction({to: WGM721.address, value: ethers.utils.parseUnits("1", "ether").toHexString()});
                // await tx.wait();
            })
            xit("this function can be called by only owner", async() => {
                await expect(WGM721.connect(alice).withdraw(alice.address)).to.be.revertedWith("This is not allowed except for _creator or agent");
            })
            xit("all balance should be transfered for owner", async() => {
                let contractBalance0 = await provider.getBalance(WGM721.address);
                let balance0 = await provider.getBalance(alice.address);

                console.log("ContractBalance0",ethers.utils.formatEther(contractBalance0))
                console.log("balance0",ethers.utils.formatEther(balance0))
                tx = await WGM721.withdrawByOwner(alice.address);
                await tx.wait()

                let contractBalance = await provider.getBalance(WGM721.address);
                let balance = await provider.getBalance(alice.address);
                console.log("ContractBalance",ethers.utils.formatEther(contractBalance))
                console.log("balance",ethers.utils.formatEther(balance))
            })
        })
    })

    // describe("Normal method for ERC1155", () => {
    //     describe("switch saleStates", () => {
    //         it("can't mint when sales is suspended", async() => {

    //         })
    //         it("can't premint until presale is started", async() => {

    //         })
    //     })
    //     describe("presales for whitelisted", () => {
    //         it("it shouldn't be passed when not whitelisted", async() => {
                
    //         })
    //         it("it shouldn't be passed when msg.value is incorrect", async() => {
                
    //         })
    //         it("it should be passed when fully prepared", async() => {
                
    //         })
    //     })
    //     describe("public mint sales", () => {
    //         it("it shouldn't be passed when msg.value is incorrect", async() => {
                
    //         })
    //         it("it shouldn't be passed when max supply reached", async() => {
                
    //         })
    //         it("it should be passed when fully prepared", async() => {
                
    //         })
    //     })
    //     describe("airdrop", () => {
    //         it("this function can be called by only owner", async() => {
                
    //         })
    //         it("balk mint is on track")
    //     })
    //     describe("withdrow Revenue", () => {
    //         it("this function can be called by only owner", async() => {
                
    //         })
    //         it("all balance should be transfered for owner", async() => {
                
    //         })
    //     })
    // })

    describe("Revenue Pool test", () => {
        beforeEach(async () => {
            tx = await WGM721.startPublicSale();
            await tx.wait();
            // first funding
            tx = await WGM721.connect(alice).mint({ value: ethers.utils.parseEther("1")});
            await tx.wait();
            let contractBalance0 = await provider.getBalance(WGM721.address);
            let balance0 = await provider.getBalance(owner.address);

            console.log("initial contract balance:",ethers.utils.formatEther(contractBalance0))
            console.log("initial user balance:",ethers.utils.formatEther(balance0))
        })
        it("each share must be keeped even withdrawal become complex", async() => {

            let claimingValue = await WGM721.claimable();
            console.log("initial claimable:", ethers.utils.formatEther(claimingValue));

            /* 
            *  Share setting 
            *   owner: 20%
            *   alice: 30%
            *   bob: 50%
            *  final revenue
            *   2 ether
            *  final desirable amount
            *   contract: 1 ether
            *   owner: 0.4 ether - gas
            *   alice: 0.6 ether - gas
            *   bob: unaquired
            */
            let stakeHolders = [owner.address, alice.address, bob.address];
            let shares = [20, 30, 50]

            tx = await WGM721.setShare(stakeHolders, shares);
            await tx.wait()

            let myShare = await WGM721.share(owner.address);
            console.log("my share:", myShare.toString());

            claimingValue = await WGM721.claimable();
            console.log("claimable:", ethers.utils.formatEther(claimingValue));

            // first withdrawal by owner
            tx = await WGM721.withdraw(owner.address, claimingValue.div(2));
            await tx.wait()

            let contractBalance = await provider.getBalance(WGM721.address);
            let balance = await provider.getBalance(owner.address);
            console.log("After first withdraw")
            console.log("contract balance:",ethers.utils.formatEther(contractBalance))
            console.log("user balance:",ethers.utils.formatEther(balance))

            // second funding
            tx = await WGM721.connect(alice).mint({ value: ethers.utils.parseEther("1")});
            await tx.wait();

            contractBalance = await provider.getBalance(WGM721.address);
            balance = await provider.getBalance(owner.address);
            console.log("After second funding")
            console.log("contract balance:",ethers.utils.formatEther(contractBalance))
            console.log("user balance:",ethers.utils.formatEther(balance))

            // second withdrawal by alice
            claimingValue = await WGM721.connect(alice).claimable();
            tx = await WGM721.connect(alice).withdraw(alice.address, claimingValue);
            await tx.wait()

            // second withdrawal by owner
            claimingValue = await WGM721.claimable();
            tx = await WGM721.withdraw(owner.address, claimingValue);
            await tx.wait()
            let claimedValue = await WGM721.totalPayed();

            contractBalance = await provider.getBalance(WGM721.address);
            balance = await provider.getBalance(owner.address);
            console.log("After second withdraw")
            console.log("contract balance:",ethers.utils.formatEther(contractBalance))
            console.log("user balance:",ethers.utils.formatEther(balance))
            console.log("totalPayed:", ethers.utils.formatEther(claimedValue))
        })
    })
})