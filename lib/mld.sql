-- SQL for 'produit' table
CREATE TABLE produit (
    idprod SERIAL PRIMARY KEY,
    itemname VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    stockalerte INT NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SQL for 'commande' table
CREATE TABLE commande (
    idcomm SERIAL PRIMARY KEY,
    inco_term VARCHAR(255) NOT NULL,
    transport_mode VARCHAR(255) NOT NULL,
    delivery_point VARCHAR(255) NOT NULL,
    requeste_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    payement_type VARCHAR(255) NOT NULL,
    currency VARCHAR(50) NOT NULL,
    vat_rate DECIMAL(5, 2) NOT NULL,
    activites TEXT,
    status VARCHAR(50) NOT NULL,
    origine VARCHAR(255),
    total_amount_ex_vat DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    total_amount_inc_charge_usd DECIMAL(10, 2),
    total_amount_inc_charge_cdf DECIMAL(10, 2),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_livraison DATE,
    adresse_livraison TEXT,
    idcl INT REFERENCES client (idcl) -- Foreign key reference
);

-- SQL for 'stock' table
CREATE TABLE stock (
    idstock SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    quantity INT NOT NULL,
    idprod INT REFERENCES produit (idprod),
    emplacement VARCHAR(255),
    date_expiration DATE
);

-- SQL for 'detailcommmade' table
CREATE TABLE detailcommmade (
    iddetcom SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    remaining_qty INT NOT NULL,
    uom VARCHAR(50) NOT NULL,
    driver_Id INT NOT NULL,
    driver_name VARCHAR(255) NOT NULL,
    vehicule_number VARCHAR(255),
    remark TEXT,
    idprod INT REFERENCES produit (idprod),
    idcom INT REFERENCES commande (idcomm),
    prix_unitaire DECIMAL(10, 2),
    total DECIMAL(10, 2),
    etat VARCHAR(50)
);

-- SQL for 'client' table
CREATE TABLE client (
    idcl SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL, -- Last name
    prenom VARCHAR(255) NOT NULL, -- First name
    avenue VARCHAR(255),
    numero VARCHAR(50),
    quartier VARCHAR(255),
    commune VARCHAR(255),
    ville VARCHAR(255),
    numeroimpot VARCHAR(100),
    rccmm VARCHAR(100),
    telephone VARCHAR(20),
    email VARCHAR(255),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type_client VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE Users (
    iduser SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),
    password VARCHAR(255)
)