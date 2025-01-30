# 使用 Hardhat Console 測試轉帳

本指南將介紹如何使用 **Hardhat Console** 在本地測試網上模擬 `transfer` 轉帳流程。

## 🚀 步驟 1：啟動 Hardhat 測試網

確保 Hardhat Network 正在運行：

```sh
npx hardhat node
```

執行後，你會看到 20 個測試帳戶，每個帳戶有 10000 ETH（用來測試交易）。

---

## 🚀 步驟 2：部署合約

打開新的終端（保持 `npx hardhat node` 運行），然後執行：

```sh
npx hardhat run scripts/deploy.js --network localhost
```

部署後，你應該會看到合約地址，例如：

```
MyToken 部署成功！合約地址: 0x123456789abcdef...
```

記住這個 **合約地址**，稍後會用到。

---

## 🚀 步驟 3：進入 Hardhat Console

開啟 **Hardhat Console** 來與合約互動：

```sh
npx hardhat console --network localhost
```

這會開啟一個交互式環境，讓你可以用 JavaScript 操作合約。

---

## 🚀 步驟 4：載入合約

在 Hardhat Console 中，輸入以下指令來載入你的合約：

```js
const { ethers } = require("hardhat");

// 你的合約地址（剛剛部署時的地址）
const contractAddress = "0x123456789abcdef...";

// 取得測試帳戶
const [owner, addr1] = await ethers.getSigners();

// 連接到 MyToken 合約
const MyToken = await ethers.getContractFactory("MyToken");
const myToken = await MyToken.attach(contractAddress);
```

如果成功，`myToken` 變數現在已經可以與你的合約互動了！ 🎉

---

## 🚀 步驟 5：檢查帳戶餘額

檢查 `owner` 帳戶的代幣餘額：

```js
const balance = await myToken.balances(owner.address);
console.log(`Owner 代幣餘額: ${balance.toString()}`);
```

如果正確，應該會顯示：

```
Owner 代幣餘額: 1000000
```

再確認 `addr1`（另一個測試帳戶）的餘額：

```js
const balance2 = await myToken.balances(addr1.address);
console.log(`addr1 代幣餘額: ${balance2.toString()}`);
```

這應該會回傳 `0`，因為 `addr1` 還沒收到代幣。

---

## 🚀 步驟 6：執行轉帳

讓 `owner` 轉 500 代幣給 `addr1`：

```js
await myToken.transfer(addr1.address, 500);
console.log("轉帳成功！");
```

然後檢查 `addr1` 是否成功收到代幣：

```js
const newBalance2 = await myToken.balances(addr1.address);
console.log(`addr1 新的代幣餘額: ${newBalance2.toString()}`);
```

應該會顯示：

```
addr1 新的代幣餘額: 500
```

---

## 🎯 總結

1. **啟動 Hardhat 測試網**：
   ```sh
   npx hardhat node
   ```
2. **部署合約**：
   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```
3. **進入 Hardhat Console**：
   ```sh
   npx hardhat console --network localhost
   ```
4. **載入合約**：
   ```js
   const myToken = await ethers.getContractFactory("MyToken").then(f => f.attach("合約地址"));
   ```
5. **檢查餘額**：
   ```js
   console.log((await myToken.balances(地址)).toString());
   ```
6. **執行轉帳**：
   ```js
   await myToken.transfer(目標地址, 數量);
   ```

