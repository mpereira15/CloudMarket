// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CloudMarket {
    
    struct Product {
        uint id;
        uint price;
        uint registerTime;
        uint[] data;
        string name;
        string description;
        string status;
        address tracker;
        address payable owner;
        address buyer;
    }
    
    struct Company {
        address id;
        string name;
        string email;
        string country;
    }
    
    struct Data {
        uint temperature;
        uint humidity;
        uint co2Level;
        uint soilMoisture;
        uint soilPh;
        uint registerTime;
        string location;
    }
    
    uint numDatos;
    address[] companyAddresses;
    
    address public manager;
    uint public numProducts = 1;
    uint public numProductsOnSale = 0;
    
    mapping(uint => Product) public products;
    mapping(address => Company) public companies;
    mapping(uint => Data) public data;
    
    constructor() {
        manager = msg.sender;
    }
    
    function createCompany(string memory name, string memory email, string memory country) public {
        require(
            bytes(companies[msg.sender].name).length == 0, 
            'Company already registered'
        );
        
        Company storage c = companies[msg.sender];
        
        c.id = msg.sender;
        c.name = name;
        c.email = email;
        c.country = country;
        
        companyAddresses.push(c.id);
    }
    
    function createProduct(string memory name, string memory description, address tracker) public returns (uint productId) {
        productId = numProducts++;
        
        Product storage p = products[productId];
        
        p.id = productId;
        p.name = name;
        p.description = description;
        p.tracker = tracker;
        p.owner = msg.sender;
        p.registerTime = block.timestamp;
        p.status = 'Tracking';
        
        return productId;
    }
    
    function addData(uint productId, uint temperature, uint humidity, uint co2Level, uint soilMoisture, uint soilPh, string memory location) public returns (uint dataId) {
        require(
            bytes(products[productId].name).length != 0, 
            'This product does not exists'
        );
        
        Product storage p = products[productId];
        
        require(
            p.tracker == msg.sender, 
            'Incorrect sensorAddress'
        );
        
        dataId = numDatos++;
        
        Data storage d = data[dataId];
            
        d.temperature = temperature;
        d.humidity = humidity;
        d.co2Level = co2Level;
        d.soilMoisture = soilMoisture;
        d.soilPh = soilPh;
        d.location = location;
        d.registerTime = block.timestamp;
            
        p.data.push(dataId);
    }
    
    function authorizeSale(uint productId, uint price) public {
        require(
            products[productId].owner == msg.sender, 
            'This product has a different owner'
        );   
        require(
            products[productId].price == 0, 
            'The product already has a price established'
        );
        
        products[productId].price = price * 1000000000000000000; //wei to ether values
        products[productId].status = 'On sale';
        
        numProductsOnSale++;
    }
    
    function payment(uint productId) public payable {
        require(
            products[productId].buyer == address(0),
            "The product has already been sold"
        );
        require(
            products[productId].price != 0,
            "The product is not available to sell"
        );
        require(
            msg.value == products[productId].price,
            "The product price is incorrect"
        );
        
        products[productId].owner.transfer(msg.value);
        products[productId].buyer = msg.sender;
        products[productId].status = 'Sold';
        
        numProductsOnSale--;
    }
    
    function getProductData(uint productId) public view returns(uint[] memory datosId) {
        return products[productId].data;
    }
    
    function getCompanyAddresses() public view returns(address[] memory companyId) {
        return companyAddresses;
    }
        
}