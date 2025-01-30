const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(); // 部署合約

  await myToken.waitForDeployment(); // ✅ 使用 waitForDeployment() 取代 deployed()

  console.log(`MyToken 部署成功！合約地址: ${await myToken.getAddress()}`); // ✅ getAddress() 取代 address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
