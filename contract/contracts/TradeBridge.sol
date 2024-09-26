// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

interface ITBTK {
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
}

contract TradeBridge {
    uint public transactionFee;
    uint public transactionCount;
    uint public transactionId;
    uint public nextCommodityId;
    address public owner;

    struct Commodity {
        uint commodityId;
        string commodityTitle;
        string commodityDescription;
        uint commodityQuantity;
        string quantityMeasurement;
        uint pricePerQuantity;
        string imageOne;
        string imageTwo;
        string imageThree;
        string imageFour;
        uint createdAt;
        string commodityLocation;
        bool isAvailable;
    }

    struct Sale {
        address buyer;
        address seller;
        uint commodityId;
        uint quantity;
    }

    Commodity[] public allCommodities;
    Sale[] public sales;

    mapping(address => uint[]) public userCommodities;

    event CommodityPurchased(address indexed buyer, uint commodityId, uint quantity, uint amount);
    event CommodityAdded(address indexed seller, uint commodityId, string commodityTitle, string commodityDescription, uint commodityQuantity, string quantityMeasurement, string imageOne, string imageTwo, string imageThree, string imageFour, uint createdAt, string commodityLocation);
    event Rating(address indexed seller, bool rating);
    event DisputeRaised(address indexed defaulter, address indexed reporter, uint commodityId);
    event DisputeResolved(address indexed defaulter, address indexed reporter);

    constructor() {
        owner = msg.sender;
        nextCommodityId = 1;
    }

    function addCommodity(
        string memory _commodityTitle,
        string memory _commodityDescription,
        uint _commodityQuantity,
        string memory _quantityMeasurement,
        uint _pricePerQuantity,
        string memory _imageOne,
        string memory _imageTwo,
        string memory _imageThree,
        string memory _imageFour,
        string memory _commodityLocation
    ) public {
        Commodity memory newCommodity = Commodity({
            commodityId: nextCommodityId,
            commodityTitle: _commodityTitle,
            commodityDescription: _commodityDescription,
            commodityQuantity: _commodityQuantity,
            quantityMeasurement: _quantityMeasurement,
            pricePerQuantity: _pricePerQuantity,
            imageOne: _imageOne,
            imageTwo: _imageTwo,
            imageThree: _imageThree,
            imageFour: _imageFour,
            createdAt: block.timestamp,
            commodityLocation: _commodityLocation,
            isAvailable: true
        });
        
        allCommodities.push(newCommodity);
        userCommodities[msg.sender].push(nextCommodityId);

        emit CommodityAdded(msg.sender, nextCommodityId, _commodityTitle, _commodityDescription, _commodityQuantity, _quantityMeasurement, _imageOne, _imageTwo, _imageThree, _imageFour, block.timestamp, _commodityLocation);

        nextCommodityId++;
    }

    function getAllCommodities() external view returns (Commodity[] memory) {
        return allCommodities;
    }

    function getCommoditiesByUser(address user) external view returns (Commodity[] memory) {
        uint[] memory userCommodityIds = userCommodities[user];
        Commodity[] memory userCommoditiesArray = new Commodity[](userCommodityIds.length);

        for (uint i = 0; i < userCommodityIds.length; i++) {
            userCommoditiesArray[i] = allCommodities[userCommodityIds[i] - 1];
        }

        return userCommoditiesArray;
    }

    function buyCommodity(uint _commodityId, uint _quantity) external {
        require(_commodityId > 0 && _commodityId < nextCommodityId, "Error: Commodity does not exist");
        Commodity storage commodity = allCommodities[_commodityId - 1];
        require(commodity.commodityQuantity >= _quantity, "Error: Commodity quantity is lower than your quantity");
        require(_quantity > 0, "Error: Quantity cannot be zero");

        uint totalAmount = commodity.pricePerQuantity * _quantity;
        require(ITBTK(address(this)).balanceOf(msg.sender) >= totalAmount, "Error: Insufficient balance");

        ITBTK(address(this)).transfer(address(this), totalAmount);

        commodity.commodityQuantity -= _quantity;

        sales.push(Sale({
            buyer: msg.sender,
            seller: msg.sender,
            commodityId: _commodityId,
            quantity: _quantity
        }));

        emit CommodityPurchased(msg.sender, _commodityId, _quantity, totalAmount);
    }
}