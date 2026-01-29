INSERT INTO Category (name)
VALUES
    (N'Hồ Điệp'),
    (N'Cattleya'),
    (N'Dendrobium');

INSERT INTO Orchid (
    orchid_name,
    orchid_description,
    is_Special,
    image,
    price,
    cate_id
)
VALUES
    (
        N'Hồ Điệp Trắng',
        N'Hoa hồ điệp trắng tinh khiết, sang trọng',
        1,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHn26B0KKRHjeFy9-CH-155mlK6yA9jSn8Q&s',
        350000,
        1
    ),
    (
        N'Hồ Điệp Hồng',
        N'Hoa hồ điệp màu hồng, thích hợp làm quà tặng',
        0,
        'https://www.gardenhealth.com/wp-content/uploads/2019/01/orchid-on-window.jpg',
        390000,
        1
    ),
    (
        N'Hồ Điệp Vàng',
        N'Hoa hồ điệp vàng mang ý nghĩa tài lộc',
        1,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdjSse23ZsLRpBkD0ATr4DcXsqAm46sM0vVg&s',
        420000,
        1
    ),
    (
        N'Cattleya Tím',
        N'Hoa cattleya tím, hương thơm nhẹ',
        0,
        'https://images.prismic.io/orchidweb/8f2a9f8c-ea23-412a-9285-d7524d9f88b9_Phalaenopsis.jpeg?auto=compress,format',
        450000,
        2
    ),
    (
        N'Cattleya Trắng',
        N'Hoa cattleya trắng tinh tế',
        0,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEmHfmqZJmR9RKgK1deHXGxGP6PcLJSxAE_g&s',
        480000,
        2
    ),
    (
        N'Dendrobium Tím',
        N'Hoa dendrobium tím, dễ trồng và chăm sóc',
        0,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7Ixu6DS32hrrS2ZpvHflevzyanZbDyDgXA&s',
        280000,
        3
    ),
    (
        N'Dendrobium Trắng',
        N'Hoa dendrobium trắng, nở lâu',
        0,
        'https://cdn.uaeflowers.com/uploads/product/uaeflowers/Pink_Phalaenopsis_orchid_plant_74_8249.webp',
        300000,
        3
    ),
    (
        N'Dendrobium Lai',
        N'Hoa dendrobium lai, màu sắc nổi bật',
        1,
        'https://hips.hearstapps.com/hmg-prod/images/orchid-tropical-houseplants-austin-tx-royalty-free-image-1750255681.pjpeg?crop=0.668xw:1.00xh;0.152xw,0&resize=1120:*',
        520000,
        3
    );

