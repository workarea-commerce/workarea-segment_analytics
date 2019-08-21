/*eslint no-unused-vars: 0 */
function productListPayload() {
    return {
        "name": "Electronics",
        "page": 1,
        "per_page": 20,
        "impressions": [
            {
                "id": "4AF99AB7C8",
                "name": "Heavy Duty Iron Bag",
                "sku": "288457637-1",
                "sale": false,
                "price": 19.77,
                "category": "Automotive",
                "position": 0
            },
            {
                "id": "A77BE95FD8",
                "name": "Gorgeous Linen Computer",
                "sku": "087096987-0",
                "sale": false,
                "price": 0.42,
                "category": "Automotive",
                "position": 1
            },
            {
                "id": "CD2B8085BE",
                "name": "Sleek Linen Gloves",
                "sku": "441641257-6",
                "sale": false,
                "price": 18.67,
                "category": "Automotive",
                "position": 2
            },
            {
                "id": "3034884ECA",
                "name": "Durable Wool Hat",
                "sku": "610796205-0",
                "sale": false,
                "price": 63.16,
                "category": "Automotive",
                "position": 3
            },
            {
                "id": "3B35A19DFF",
                "name": "Lightweight Rubber Coat",
                "sku": "124560496-1",
                "sale": false,
                "price": 13.15,
                "category": "Automotive",
                "position": 4
            },
            {
                "id": "F7BBD9B1D2",
                "name": "Rustic Paper Keyboard",
                "sku": "243345833-1",
                "sale": false,
                "price": 7.77,
                "category": "Automotive",
                "position": 5
            },
            {
                "id": "5286E1F9EA",
                "name": "Incredible Cotton Shirt",
                "sku": "873666584-3",
                "sale": false,
                "price": 45.11,
                "category": "Automotive",
                "position": 6
            },
            {
                "id": "E538866CFC",
                "name": "Small Bronze Hat",
                "sku": "710835615-5",
                "sale": false,
                "price": 12.34,
                "category": "Automotive",
                "position": 7
            },
            {
                "id": "952B3D844B",
                "name": "Aerodynamic Paper Clock",
                "sku": "392558208-8",
                "sale": false,
                "price": 22.59,
                "category": "Automotive",
                "position": 8
            },
            {
                "id": "B6BD620005",
                "name": "Durable Iron Table",
                "sku": "795417242-2",
                "sale": false,
                "price": 23.07,
                "category": "Automotive",
                "position": 9
            },
            {
                "id": "546CB731CB",
                "name": "Fantastic Leather Hat",
                "sku": "857899444-2",
                "sale": false,
                "price": 29.59,
                "category": "Automotive",
                "position": 10
            },
            {
                "id": "9FF7028768",
                "name": "Gorgeous Leather Knife",
                "sku": "887139418-6",
                "sale": false,
                "price": 42.41,
                "category": "Automotive",
                "position": 11
            },
            {
                "id": "9F729D69C6",
                "name": "Synergistic Copper Coat",
                "sku": "423424193-8",
                "sale": false,
                "price": 29.59,
                "category": "Automotive",
                "position": 12
            },
            {
                "id": "4011335B6B",
                "name": "Intelligent Wool Clock",
                "sku": "464990513-3",
                "sale": false,
                "price": 31.2,
                "category": "Automotive",
                "position": 13
            },
            {
                "id": "B28798CDAD",
                "name": "Durable Bronze Bag",
                "sku": "547390027-5",
                "sale": false,
                "price": 12.46,
                "category": "Automotive",
                "position": 14
            },
            {
                "id": "84EACAB9F7",
                "name": "Lightweight Leather Bottle",
                "sku": "027837187-6",
                "sale": false,
                "price": 17.47,
                "category": "Automotive",
                "position": 15
            },
            {
                "id": "C02747F6C6",
                "name": "Practical Wooden Coat",
                "sku": "181342040-8",
                "sale": false,
                "price": 42.33,
                "category": "Automotive",
                "position": 16
            },
            {
                "id": "44459088C3",
                "name": "Gorgeous Linen Computer",
                "sku": "226387489-5",
                "sale": false,
                "price": 24.9,
                "category": "Automotive",
                "position": 17
            },
            {
                "id": "F1EDB5846B",
                "name": "Mediocre Bronze Chair",
                "sku": "380482668-7",
                "sale": false,
                "price": 20.55,
                "category": "Automotive",
                "position": 18
            },
            {
                "id": "1A05D231CB",
                "name": "Incredible Rubber Bag",
                "sku": "050606049-7",
                "sale": false,
                "price": 10.02,
                "category": "Automotive",
                "position": 19
            }
        ]
    };
}

function orderPayload() {
    return  {
        "site_name": "Dummy App",
        "id": "6705E78231",
        "promo_codes": ['promo_1', 'promo_2'],
        "shipping_service": "Ground",
        "shipping_total": 7.0,
        "tax_total": 1.0,
        "total_price": 152.92,
        "tenders": 'Visa',
        "email": 'test@weblinc.com',
        "items": [
            {
                "id": "5964ef7d9d1fa2f1d0626c86",
                "product_id": "4AF99AB7C8",
                "product_name": "Heavy Duty Iron Bag",
                "sku": "288457637-1",
                "options": {
                    "Size": "Medium",
                    "Color": "Silver"
                },
                "price": 80.76,
                "quantity": 1,
                "category": "Automotive"
            },
            {
                "id": "595fbf819d1fa2b3a0c4bd00",
                "product_id": "F7BBD9B1D2",
                "product_name": "Rustic Paper Keyboard",
                "sku": "517371131-0",
                "options": {
                    "Size": "Small",
                    "Color": "Fuchsia"
                },
                "price": 65.16,
                "quantity": 1,
                "category": "Automotive"
            }
        ]
    };
}
