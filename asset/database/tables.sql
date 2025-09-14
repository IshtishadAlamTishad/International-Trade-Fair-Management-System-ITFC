-- 1. TradeFair
CREATE TABLE TradeFair (
    FairID        NUMBER PRIMARY KEY,
    TName         VARCHAR2(100),
    City          VARCHAR2(50),
    StartDate     DATE,
    EndDate       DATE,
    Duration      NUMBER
);

-- 2. Hall
CREATE TABLE Hall (
    HallID        NUMBER PRIMARY KEY,
    HName         VARCHAR2(100),
    Location      VARCHAR2(100),
    BuildingName  VARCHAR2(100),
    Floor         NUMBER,
    AptNo         VARCHAR2(20),
    FairID        NUMBER,
    FOREIGN KEY (FairID) REFERENCES TradeFair(FairID)
);

-- 3. Stall
CREATE TABLE Stall (
    StallID   NUMBER PRIMARY KEY,
    S_ize      VARCHAR2(50),
    Price     NUMBER(10,2),
    HallID    NUMBER,
    FOREIGN KEY (HallID) REFERENCES Hall(HallID)
);

-- 4. Exhibitor
CREATE TABLE Exhibitor (
    ExhibitorID  NUMBER PRIMARY KEY,
    EName        VARCHAR2(100),
    Contact      VARCHAR2(100),
    Email        VARCHAR2(100),
    Phone        VARCHAR2(20),
    EmailAddress VARCHAR2(100)
);


-- 5. SalesSummary
CREATE TABLE SalesSummary (
    SummaryID        NUMBER PRIMARY KEY,
    FairID           NUMBER,
    ExhibitorID      NUMBER,
    NoOfProductsSold NUMBER,
    TotalSales       NUMBER(12,2),
    FOREIGN KEY (FairID) REFERENCES TradeFair(FairID),
    FOREIGN KEY (ExhibitorID) REFERENCES Exhibitor(ExhibitorID)
);

-- 6. Product
CREATE TABLE Product (
    ProductID    NUMBER PRIMARY KEY,
    PName        VARCHAR2(100),
    Category     VARCHAR2(50),
    Description  VARCHAR2(200),
    Price        NUMBER(10,2),
    Stock        NUMBER,
    ExhibitorID  NUMBER,
    FOREIGN KEY (ExhibitorID) REFERENCES Exhibitor(ExhibitorID)
);

 
-- 7. Payment
CREATE TABLE Payment (
    PaymentID     NUMBER PRIMARY KEY,
    Amount        NUMBER(12,2),
    PaymentMode          VARCHAR2(50),
    TransactionID VARCHAR2(100),
    Status        VARCHAR2(50),
    ExhibitorID   NUMBER,
    FOREIGN KEY (ExhibitorID) REFERENCES Exhibitor(ExhibitorID)
);

-- 8. Visitor
CREATE TABLE Visitor (
    VisitorID    NUMBER PRIMARY KEY,
    FirstName    VARCHAR2(50),
    LastName     VARCHAR2(50),
    Contact      VARCHAR2(100),
    Phone        VARCHAR2(20),
    EmailAddress VARCHAR2(100),
    Interests    VARCHAR2(200)
);


-- 9. VisitorInterest
CREATE TABLE VisitorInterest (
    VisitorID NUMBER,
    Interest  VARCHAR2(100),
    PRIMARY KEY (VisitorID, Interest),
    FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID)
);

-- 10. Ticket
CREATE TABLE Ticket (
    TicketID     NUMBER PRIMARY KEY,
    Type         VARCHAR2(50),
    Price        NUMBER(10,2),
    PurchaseDate DATE,
    FairID       NUMBER,
    VisitorID    NUMBER,
    FOREIGN KEY (FairID) REFERENCES TradeFair(FairID),
    FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID)
);

-- 11. Feedback
CREATE TABLE Feedback (
    FeedbackID NUMBER PRIMARY KEY,
    FairID     NUMBER,
    VisitorID  NUMBER,
    Rating     NUMBER(2),
    Comments   VARCHAR2(200),
    FOREIGN KEY (FairID) REFERENCES TradeFair(FairID),
    FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID)
);