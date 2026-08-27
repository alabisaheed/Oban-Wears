const defaultInventory = [
  // ── KAFTANS ──
  { code: "OB-KF01", featured: true, name: "OB-KF01", category: "Kaftans", price: 0, discount: 0, desc: "Tailored in premium teal cotton linen featuring an intricate four-leaf geometric chest embroidery panel, structured mandarin collar, and tailored cuffs.", images: ["assets/products/KAFTAN COLLECTION/OB-KF01/2e4fa091-9a55-499d-aaad-66c90e652aeb.jpg","assets/products/KAFTAN COLLECTION/OB-KF01/4e3fda67-bced-4916-8505-b8d5954c1973.jpg","assets/products/KAFTAN COLLECTION/OB-KF01/e0922109-3caa-4ef1-bf67-c79691b5a532.jpg"] },
  { code: "OB-KF02", featured: true, name: "OB-KF02", category: "Kaftans", price: 0, discount: 0, desc: "Crafted from structured forest green polished cotton showcasing rich gold and olive placket embroidery with refined long sleeve detailing.", images: ["assets/products/KAFTAN COLLECTION/OB-KF02/1b71c951-01b5-4c7f-a672-1b00d782aa30.jpg","assets/products/KAFTAN COLLECTION/OB-KF02/31bc0719-5c8b-462e-a291-c711d05d21de.jpg","assets/products/KAFTAN COLLECTION/OB-KF02/597541f6-28e0-4b8b-856b-bc6af056d525.jpg","assets/products/KAFTAN COLLECTION/OB-KF02/7f7f657a-ac0e-417f-947e-2a4c2c85b2db.jpg","assets/products/KAFTAN COLLECTION/OB-KF02/a7fade79-8a88-457f-8a82-dbd4ab668340.jpg","assets/products/KAFTAN COLLECTION/OB-KF02/b9a4e88e-f011-4bf8-b609-358dc8907255.jpg","assets/products/KAFTAN COLLECTION/OB-KF02/eaa23aae-ddcd-43a0-a4cc-07a97a6319ad.jpg","assets/products/KAFTAN COLLECTION/OB-KF02/Photo from Oban Wears(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF02/Photo from Oban Wears.jpg"] },
  { code: "OB-KF03", name: "OB-KF03", category: "Kaftans", price: 0, discount: 0, desc: "Vibrant royal blue kaftan styled with delicate vertical chest pintucks and a light blue checkered accent placket.", images: ["assets/products/KAFTAN COLLECTION/OB-KF03/3fe6999b-4bea-4155-928e-6589c4a19927.jpg","assets/products/KAFTAN COLLECTION/OB-KF03/BD13EEE8-ED97-4557-8EE0-074027278FDE.png","assets/products/KAFTAN COLLECTION/OB-KF03/d69bd6ae-292c-485c-a065-b77e61f76628.jpg","assets/products/KAFTAN COLLECTION/OB-KF03/ea605811-fb3f-4fc6-807e-8a616830ed60.jpg","assets/products/KAFTAN COLLECTION/OB-KF03/Photo from Oban Wears(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF03/Photo from Oban Wears.jpg"] },
  { code: "OB-KF04", name: "OB-KF04", category: "Kaftans", price: 0, discount: 0, desc: "Bold navy and royal blue checkered kaftan accented with subtle white pinstriping and a coordinating pocket accent.", images: ["assets/products/KAFTAN COLLECTION/OB-KF04/b08721c2-b48d-4c1a-9873-dde7badac924.jpg","assets/products/KAFTAN COLLECTION/OB-KF04/dff06004-cd10-482e-aa0a-7646f32e482a.jpg","assets/products/KAFTAN COLLECTION/OB-KF04/e1837a1e-b1d2-4689-a4f9-4ce074bd16c6.jpg","assets/products/KAFTAN COLLECTION/OB-KF04/ede74950-fd4c-4a78-ae4a-587f23e20b6d.JPG","assets/products/KAFTAN COLLECTION/OB-KF04/fc433454-bcf0-44ae-89df-9523cf69800e.jpg"] },
  { code: "OB-KF05", name: "OB-KF05", category: "Kaftans", price: 0, discount: 0, desc: "Dark chocolate brown and burgundy checker weave linen styled with cream topstitching and a clean round neckline.", images: ["assets/products/KAFTAN COLLECTION/OB-KF05/323edbbf-f326-45b0-8746-deba6fb185c8.jpg","assets/products/KAFTAN COLLECTION/OB-KF05/41117C10-A2AB-474F-B94B-905B1F0A5136.png","assets/products/KAFTAN COLLECTION/OB-KF05/52649ef0-75ab-4dbc-8237-27a90b0b36a2.jpg","assets/products/KAFTAN COLLECTION/OB-KF05/close up powder blue.jpg","assets/products/KAFTAN COLLECTION/OB-KF05/fcf698e1-6026-4b1c-bbe6-923950f08e27.jpg","assets/products/KAFTAN COLLECTION/OB-KF05/Full yellow.jpg"] },
  { code: "OB-KF06", name: "OB-KF06", category: "Kaftans", price: 0, discount: 0, desc: "Rich solid black kaftan decorated with intricate gold geometric diamond embroidery along the placket, pocket, and cuffs.", images: ["assets/products/KAFTAN COLLECTION/OB-KF06/39b3f68e-ba04-4a7a-8efd-95f31fa30eb5.jpg","assets/products/KAFTAN COLLECTION/OB-KF06/f030bc10-7f83-4cc8-9e04-ee840127129b(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF06/f030bc10-7f83-4cc8-9e04-ee840127129b.jpg","assets/products/KAFTAN COLLECTION/OB-KF06/Photo from Oban Wears(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF06/Photo from Oban Wears.jpg"] },
  { code: "OB-KF07", name: "OB-KF07", category: "Kaftans", price: 0, discount: 0, desc: "Soft dusty rose pink kaftan featuring detailed crimson and gold starburst embroidery on the placket and pocket.", images: ["assets/products/KAFTAN COLLECTION/OB-KF07/3706cdb3-c3f3-4472-9496-69f4f8916f60.jpg","assets/products/KAFTAN COLLECTION/OB-KF07/9d25b6a1-d636-43b4-8165-2306609973f7.jpg"] },
  { code: "OB-KF08", name: "OB-KF08", category: "Kaftans", price: 0, discount: 0, desc: "Lightweight khaki brown cotton linen with clean vertical white pinstripes and detailed geometric pocket embroidery.", images: ["assets/products/KAFTAN COLLECTION/OB-KF08/3b298ac8-4853-4f82-84eb-f9383f6f078b.jpg","assets/products/KAFTAN COLLECTION/OB-KF08/c65ebca0-3c4c-44c4-baab-7383ca0280df.jpg","assets/products/KAFTAN COLLECTION/OB-KF08/e5924d38-93d7-4d6a-9107-85a6be350d2d.jpg"] },
  { code: "OB-KF09", name: "OB-KF09", category: "Kaftans", price: 0, discount: 0, desc: "Deep navy blue polished cotton adorned with gold pinstripe embroidery and contrasting brown piping on the mandarin collar.", images: ["assets/products/KAFTAN COLLECTION/OB-KF09/021a42c3-085a-4a04-87f3-e2b2e30c8797.jpg","assets/products/KAFTAN COLLECTION/OB-KF09/f800b928-eda1-4a69-9df5-5d49153ac2c4.jpg"] },
  { code: "OB-KF10", name: "OB-KF10", category: "Kaftans", price: 0, discount: 0, desc: "Royal blue executive kaftan showcasing vibrant golden yellow diamond embroidery on the placket and chest pocket.", images: ["assets/products/KAFTAN COLLECTION/OB-KF10/a2d5c5c7-b275-4cd0-b2fc-8dc9b245e25f.jpg","assets/products/KAFTAN COLLECTION/OB-KF10/d1125222-38f3-4e07-8056-24eb98281347.jpg"] },
  { code: "OB-KF11", name: "OB-KF11", category: "Kaftans", price: 0, discount: 0, desc: "Soothing sky blue kaftan featuring hand-braided light blue geometric embroidery panels along the front button line.", images: ["assets/products/KAFTAN COLLECTION/OB-KF11/1ceb61e0-9640-4e27-b233-a0ecb28a45a0.jpg","assets/products/KAFTAN COLLECTION/OB-KF11/2d1afe7c-2580-4d0b-b106-c27b0ebca248.jpg"] },
  { code: "OB-KF12", name: "OB-KF12", category: "Kaftans", price: 0, discount: 0, desc: "Silver-grey cotton silk blend kaftan highlighting structured charcoal and slate block embroidery.", images: ["assets/products/KAFTAN COLLECTION/OB-KF12/0bc6bda1-d5e7-4a6d-9c10-bf2bb6a72649.jpg","assets/products/KAFTAN COLLECTION/OB-KF12/35955e65-c413-40a6-a815-25c36276a312.jpg","assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears(2).jpg","assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears(3).jpg","assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears.jpg"] },
  { code: "OB-KF13", name: "OB-KF13", category: "Kaftans", price: 0, discount: 0, desc: "Sage green linen kaftan designed with modern white and emerald green cross-and-square embroidery motifs.", images: ["assets/products/KAFTAN COLLECTION/OB-KF13/6BCAD435-5A45-4A23-954C-B8BE1E19764F.png","assets/products/KAFTAN COLLECTION/OB-KF13/F6E70A07-9BE2-4814-B34A-D57A0F755735.png","assets/products/KAFTAN COLLECTION/OB-KF13/Photo from Oban Wears(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF13/Photo from Oban Wears.jpg"] },
  { code: "OB-KF14", name: "OB-KF14", category: "Kaftans", price: 0, discount: 0, desc: "Breathable self-striped white linen featuring multi-tone black, brown, and navy geometric chest stitching.", images: ["assets/products/KAFTAN COLLECTION/OB-KF14/01caa88b-08c3-45a3-a56f-800dbb6ba70f.jpg","assets/products/KAFTAN COLLECTION/OB-KF14/9289e721-f021-4169-a7ee-651e7d9a02b0.jpg","assets/products/KAFTAN COLLECTION/OB-KF14/fc748e78-29ed-4bc6-a27e-be1eedda5122.jpg","assets/products/KAFTAN COLLECTION/OB-KF14/Photo from Oban Wears(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF14/Photo from Oban Wears.jpg"] },
  { code: "OB-KF15", name: "OB-KF15", category: "Kaftans", price: 0, discount: 0, desc: "Mustard gold ceremonial kaftan showcasing a dramatic black and gold scallop scale embroidery pattern.", images: ["assets/products/KAFTAN COLLECTION/OB-KF15/13598872-75af-4156-8239-8d9d5cea4999.jpg","assets/products/KAFTAN COLLECTION/OB-KF15/883c1f95-5fd6-4ea7-aa37-91ea45498fb6(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF15/Photo from Oban Wears(1).jpg","assets/products/KAFTAN COLLECTION/OB-KF15/Photo from Oban Wears(2).jpg","assets/products/KAFTAN COLLECTION/OB-KF15/Photo from Oban Wears.jpg"] },
  { code: "OB-KF16", name: "OB-KF16", category: "Kaftans", price: 0, discount: 0, desc: "Clean ivory white kaftan featuring minimal obsidian black button accents and structured shoulder seams.", images: ["assets/products/KAFTAN COLLECTION/OB-KF16/2.png","assets/products/KAFTAN COLLECTION/OB-KF16/9bac4745-4b3f-4847-a474-e010910cdddd.jpg","assets/products/KAFTAN COLLECTION/OB-KF16/b188ff0d-aeda-40c6-bfef-3375db704f7d.jpg","assets/products/KAFTAN COLLECTION/OB-KF16/Photo from Oban Wears.jpg"] },
  { code: "OB-KF17", name: "OB-KF17", category: "Kaftans", price: 0, discount: 0, desc: "Dusty mauve lilac kaftan displaying elegant black rope-knot embroidery on the chest pocket with black button detailing.", images: ["assets/products/KAFTAN COLLECTION/OB-KF17/Oban Set 13 e - 1.PNG","assets/products/KAFTAN COLLECTION/OB-KF17/Oban Set 13 e - 3.PNG"] },
  { code: "OB-KF18", name: "OB-KF18", category: "Kaftans", price: 0, discount: 0, desc: "Chocolate brown micro-check kaftan detailed with black collar piping and an understated paisley placket inlay.", images: ["assets/products/KAFTAN COLLECTION/OB-KF18/IMG-20240626-WA0013.jpg","assets/products/KAFTAN COLLECTION/OB-KF18/IMG-20240626-WA0017.jpg"] },
  { code: "OB-KF19", name: "OB-KF19", category: "Kaftans", price: 0, discount: 0, desc: "Charcoal grey pinstripe kaftan featuring structured shoulders, silver collar piping, and geometric chest trim.", images: ["assets/products/KAFTAN COLLECTION/OB-KF19/IMG-20240626-WA0027.jpg","assets/products/KAFTAN COLLECTION/OB-KF19/IMG-20240626-WA0029.jpg"] },
  { code: "OB-KF20", name: "OB-KF20", category: "Kaftans", price: 0, discount: 0, desc: "Terracotta orange kaftan highlighted by dark brown crescent arch embroidery on the pocket and coordinating button accents.", images: ["assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0013.jpg","assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0015.jpg","assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0017.jpg"] },
  // ── AGBADA ──
  { code: "OB-AG01", featured: true, name: "OB-AG01", category: "Agbada", price: 0, discount: 0, desc: "Ceremonial turquoise blue Agbada featuring a bold black geometric weave embroidery motif across the chest and matching Fila cap.", images: ["assets/products/AGBADA COLLECTION/OB-AG01/23.jpg","assets/products/AGBADA COLLECTION/OB-AG01/24.jpg"] },
  { code: "OB-AG02", featured: true, name: "OB-AG02", category: "Agbada", price: 0, discount: 0, desc: "Mint green traditional Agbada detailed with dark green and mint abstract geometric embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG02/1475af46-42d8-434a-9a91-abf10d6ca14a.jpg","assets/products/AGBADA COLLECTION/OB-AG02/413330bb-2813-4d0f-aa6b-1a684794b574.jpg"] },
  { code: "OB-AG03", name: "OB-AG03", category: "Agbada", price: 0, discount: 0, desc: "Premium light grey Agbada showcasing multi-color light blue, bronze, and navy geometric cross embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG03/36bebf71-b1c9-40b1-a460-4ae3d2f1d1b4.jpg","assets/products/AGBADA COLLECTION/OB-AG03/b8f2f6e9-f79f-44da-b6fe-d1be4d608688.jpg","assets/products/AGBADA COLLECTION/OB-AG03/c7a342ab-1b63-4c88-ba20-09c9042ea1eb.jpg"] },
  { code: "OB-AG04", name: "OB-AG04", category: "Agbada", price: 0, discount: 0, desc: "Charcoal black wool blend Agbada styled with an asymmetrical lavender grey textured chest panel and striped cap.", images: ["assets/products/AGBADA COLLECTION/OB-AG04/acd55403-4172-4053-bf49-b7eb28716245.jpg","assets/products/AGBADA COLLECTION/OB-AG04/c88c32e3-66b3-4da0-8416-4737a493ba84(1).jpg","assets/products/AGBADA COLLECTION/OB-AG04/c88c32e3-66b3-4da0-8416-4737a493ba84.jpg"] },
  { code: "OB-AG05", name: "OB-AG05", category: "Agbada", price: 0, discount: 0, desc: "Slate steel blue Agbada featuring dense light blue interlocking circle embroidery across the chest yoke.", images: ["assets/products/AGBADA COLLECTION/OB-AG05/2e3cd6bc-c913-4001-b506-09a221878f93.jpg","assets/products/AGBADA COLLECTION/OB-AG05/75db1649-75b0-401c-a15b-996d8f5264a0.jpg"] },
  { code: "OB-AG06", name: "OB-AG06", category: "Agbada", price: 0, discount: 0, desc: "Striking wine red Agbada featuring raised burgundy floral cord embroidery and a matching traditional cap.", images: ["assets/products/AGBADA COLLECTION/OB-AG06/14baeca3-4bfc-4307-a5cd-c393bfbe1c61.jpg","assets/products/AGBADA COLLECTION/OB-AG06/67f26742-6f9f-4e6c-ae1f-9159ab2dc1df.jpg","assets/products/AGBADA COLLECTION/OB-AG06/cefdbe25-f7ed-4e2b-91af-01b2171dcc9a.jpg"] },
  { code: "OB-AG07", name: "OB-AG07", category: "Agbada", price: 0, discount: 0, desc: "Dusty rose pink Agbada presenting a deep maroon and pink geometric abstract chest embroidery pattern.", images: ["assets/products/AGBADA COLLECTION/OB-AG07/3a38a622-1dba-47f5-b2cf-b23ae6abb6e9.jpg","assets/products/AGBADA COLLECTION/OB-AG07/54e8c6b7-845c-459b-9fad-b5c094375a4b.jpg"] },
  { code: "OB-AG08", name: "OB-AG08", category: "Agbada", price: 0, discount: 0, desc: "Midnight navy cashmere Agbada showcasing traditional gold and beige geometric floral chest embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG08/6cf35e87-9a05-48c8-ac73-12ef7be0e33b.jpg","assets/products/AGBADA COLLECTION/OB-AG08/fb08062e-b441-4035-809a-5716358a1998(1).jpg","assets/products/AGBADA COLLECTION/OB-AG08/fb08062e-b441-4035-809a-5716358a1998.jpg"] },
  { code: "OB-AG09", name: "OB-AG09", category: "Agbada", price: 0, discount: 0, desc: "Rich sky blue ceremonial Agbada displaying tone-on-tone blue geometric chest embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG09/IMG-20240506-WA0057(0).jpg","assets/products/AGBADA COLLECTION/OB-AG09/IMG-20240506-WA0057(1).jpg","assets/products/AGBADA COLLECTION/OB-AG09/IMG-20240506-WA0057.jpg"] },
  { code: "OB-AG10", name: "OB-AG10", category: "Agbada", price: 0, discount: 0, desc: "Dark brown and navy plaid Agbada featuring a navy chest piece with copper and gold diamond grid stitching.", images: ["assets/products/AGBADA COLLECTION/OB-AG10/IMG-20240913-WA0014.jpg","assets/products/AGBADA COLLECTION/OB-AG10/IMG-20240913-WA0016(1).jpg","assets/products/AGBADA COLLECTION/OB-AG10/IMG-20240913-WA0016.jpg"] },
  { code: "OB-AG11", name: "OB-AG11", category: "Agbada", price: 0, discount: 0, desc: "Deep brick red Agbada adorned with a black chest piece featuring white and red traditional star embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG11/IMG-20240911-WA0031.jpg","assets/products/AGBADA COLLECTION/OB-AG11/IMG-20240911-WA0033.jpg","assets/products/AGBADA COLLECTION/OB-AG11/IMG-20240911-WA0035.jpg"] },
  { code: "OB-AG12", name: "OB-AG12", category: "Agbada", price: 0, discount: 0, desc: "Warm light cream linen Agbada featuring large circular geometric lines embroidery in chocolate and cream.", images: ["assets/products/AGBADA COLLECTION/OB-AG12/IMG-20240911-WA0029(1).jpg","assets/products/AGBADA COLLECTION/OB-AG12/IMG-20240911-WA0029.jpg"] },
  { code: "OB-AG13", name: "OB-AG13", category: "Agbada", price: 0, discount: 0, desc: "Rich chocolate brown Agbada featuring golden and bronze chest embroidery and a matching embroidered cap.", images: ["assets/products/AGBADA COLLECTION/OB-AG13/IMG-20240502-WA0007.jpg","assets/products/AGBADA COLLECTION/OB-AG13/IMG-20240502-WA0011.jpg","assets/products/AGBADA COLLECTION/OB-AG13/Oban wear set 14 b-1.jpg"] },
  { code: "OB-AG14", name: "OB-AG14", category: "Agbada", price: 0, discount: 0, desc: "Regal royal purple Agbada showing tone-on-tone purple geometric chest embroidery with a raised knot emblem.", images: ["assets/products/AGBADA COLLECTION/OB-AG14/Photo from Oban Wears(1).jpg","assets/products/AGBADA COLLECTION/OB-AG14/Photo from Oban Wears(2).jpg","assets/products/AGBADA COLLECTION/OB-AG14/Photo from Oban Wears.jpg"] },
  { code: "OB-AG15", name: "OB-AG15", category: "Agbada", price: 0, discount: 0, desc: "Off-white cream polished cotton Agbada featuring modern cross-shaped fan segment embroidery in brown, navy, and gold.", images: ["assets/products/AGBADA COLLECTION/OB-AG15/041a78a6-574a-4c73-b813-5985b6884833.jpg","assets/products/AGBADA COLLECTION/OB-AG15/acb415fe-8a56-4bb7-8387-b65df9393aff.jpg"] },
  { code: "OB-AG16", name: "OB-AG16", category: "Agbada", price: 0, discount: 0, desc: "White self-striped linen Agbada displaying vibrant geometric embroidery and a coordinating white and gold striped cap.", images: ["assets/products/AGBADA COLLECTION/OB-AG16/IMG_3328.jpg","assets/products/AGBADA COLLECTION/OB-AG16/IMG_3329.jpg"] },
  { code: "OB-AG17", name: "OB-AG17", category: "Agbada", price: 0, discount: 0, desc: "Asymmetrical charcoal black Agbada with a textured lavender grey chest panel and matching accessories.", images: ["assets/products/AGBADA COLLECTION/OB-AG17/9fe7b431-7590-4721-a671-cbaad357a6d8.jpg","assets/products/AGBADA COLLECTION/OB-AG17/IMG_3832.jpg"] },
  { code: "OB-AG18", name: "OB-AG18", category: "Agbada", price: 0, discount: 0, desc: "Sky blue ceremonial Agbada combining traditional volume with gold and navy blue floral diamond chest embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG18/IMG_8997.jpg","assets/products/AGBADA COLLECTION/OB-AG18/IMG_8999.jpg"] },
  { code: "OB-AG19", name: "OB-AG19", category: "Agbada", price: 0, discount: 0, desc: "Deep navy blue self-striped Agbada decorated with a traditional chest panel featuring white, green, and orange embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG19/Photo from Oban Wears(1).jpg","assets/products/AGBADA COLLECTION/OB-AG19/Photo from Oban Wears.jpg"] },
  { code: "OB-AG20", name: "OB-AG20", category: "Agbada", price: 0, discount: 0, desc: "Royal purple Agbada featuring a dense chest panel embroidered with magenta, gold, and white geometric diamond patterns.", images: ["assets/products/AGBADA COLLECTION/OB-AG20/Oban Set 14 - 10.PNG","assets/products/AGBADA COLLECTION/OB-AG20/Oban Set 14 - 11.PNG"] },
  { code: "OB-AG21", name: "OB-AG21", category: "Agbada", price: 0, discount: 0, desc: "Bright turquoise blue Agbada decorated with a rich royal blue abstract embroidery design featuring teardrop textures.", images: ["assets/products/AGBADA COLLECTION/OB-AG21/9442fe47-6be0-4640-a467-eac3f2870a6e.jpg","assets/products/AGBADA COLLECTION/OB-AG21/d43a8b19-fbfb-4395-b4b5-00fda299241c.jpg"] },
  { code: "OB-AG22", name: "OB-AG22", category: "Agbada", price: 0, discount: 0, desc: "Classic charcoal black self-striped Agbada adorned with traditional geometric chest embroidery in yellow gold and light blue.", images: ["assets/products/AGBADA COLLECTION/OB-AG22/IMG-20240707-WA0030.jpg","assets/products/AGBADA COLLECTION/OB-AG22/IMG-20240707-WA0032.jpg"] },
  { code: "OB-AG23", name: "OB-AG23", category: "Agbada", price: 0, discount: 0, desc: "Clean off-white cream Agbada styled with a vertical chest panel featuring light blue, grey, and brown geometric embroidery.", images: ["assets/products/AGBADA COLLECTION/OB-AG23/Photo from Oban Wears(1).jpg","assets/products/AGBADA COLLECTION/OB-AG23/Photo from Oban Wears(2).jpg","assets/products/AGBADA COLLECTION/OB-AG23/Photo from Oban Wears.jpg"] },
  // ── FATHER & SON ──
  { code: "OB-FS01", featured: true, name: "OB-FS01", category: "Father & Son", price: 0, discount: 0, desc: "Coordinated Father & Son Agbada set in charcoal black, featuring traditional chest panels with gold and beige geometric embroidery.", images: ["assets/products/FATHER AND SONS/OB-FS01/IMG-20240913-WA0022.jpg","assets/products/FATHER AND SONS/OB-FS01/IMG-20240913-WA0026.jpg"] },
  { code: "OB-FS02", name: "OB-FS02", category: "Father & Son", price: 0, discount: 0, desc: "Matching Father & Son Agbada set in clean off-white fabric, showcasing grey chest panels with black spiral dotted embroidery.", images: ["assets/products/FATHER AND SONS/OB-FS02/IMG_3143.JPG"] },
  { code: "OB-FS03", name: "OB-FS03", category: "Father & Son", price: 0, discount: 0, desc: "Matching Father & Son Agbada set in rich caramel brown, featuring light brown chest panels with dark brown spiral embroidery.", images: ["assets/products/FATHER AND SONS/OB-FS03/IMG_3142.JPG"] },
  { code: "OB-FS04", name: "OB-FS04", category: "Father & Son", price: 0, discount: 0, desc: "Coordinated Father & Son set in emerald green, decorated with gold and olive chest panels showcasing green spiral embroidery.", images: ["assets/products/FATHER AND SONS/OB-FS04/IMG-20251216-WA0063.jpg"] },
  { code: "OB-FS05", name: "OB-FS05", category: "Father & Son", price: 0, discount: 0, desc: "Off-white cream Father & Son Agbada matching set featuring intricate navy and bronze geometric chest stitching.", images: ["assets/products/FATHER AND SONS/OB-FS05/Photo from Oban Wears(1).jpg","assets/products/FATHER AND SONS/OB-FS05/Photo from Oban Wears.jpg"] },
  // ── SUITS & PANTS ──
  { code: "OB-SP01", featured: true, name: "OB-SP01", category: "Suits & Pants", price: 0, discount: 0, desc: "Bespoke mustard orange mandarin collar suit jacket featuring fabric-covered buttons and sharp modern tailoring.", images: ["assets/products/SUITS AND PANTS/OB-SP01/7ccef707-f56f-4a48-8fb6-8f365cda42b7.jpg","assets/products/SUITS AND PANTS/OB-SP01/7e07ec58-8305-4807-8a44-47ccd17da0b1(1).JPG","assets/products/SUITS AND PANTS/OB-SP01/7e07ec58-8305-4807-8a44-47ccd17da0b1.jpg","assets/products/SUITS AND PANTS/OB-SP01/Photo from Oban Wears.jpg"] },
  { code: "OB-SP02", name: "OB-SP02", category: "Suits & Pants", price: 0, discount: 0, desc: "Royal blue checkered three-piece suit featuring a structured jacket, matching vest, white shirt, and striped tie.", images: ["assets/products/SUITS AND PANTS/OB-SP02/IMG-20240526-WA0019.jpg","assets/products/SUITS AND PANTS/OB-SP02/IMG-20240526-WA0021(1).jpg"] },
  { code: "OB-SP03", name: "OB-SP03", category: "Suits & Pants", price: 0, discount: 0, desc: "Classic navy blue two-piece corporate suit tailored from lightweight wool with a sharp single-button closure.", images: ["assets/products/SUITS AND PANTS/OB-SP03/IMG-20240913-WA0018.jpg","assets/products/SUITS AND PANTS/OB-SP03/IMG-20240913-WA0020.jpg"] },
  { code: "OB-SP04", name: "OB-SP04", category: "Suits & Pants", price: 0, discount: 0, desc: "Premium light grey double-breasted suit jacket featuring dark contrast buttons and peak lapels.", images: ["assets/products/SUITS AND PANTS/OB-SP04/b2580288-d320-441c-aae5-dcdd7fe3c133.jpg","assets/products/SUITS AND PANTS/OB-SP04/d6ab4941-9d14-47a3-9401-2dbb725cd55b.jpg"] },
  { code: "OB-SP05", name: "OB-SP05", category: "Suits & Pants", price: 0, discount: 0, desc: "Tailored executive suit set featuring sharp modern shoulders, custom trousers, and structured lapel detailing.", images: ["assets/products/SUITS AND PANTS/OB-SP05/IMG_0486.jpg","assets/products/SUITS AND PANTS/OB-SP05/IMG_0490.jpg"] },
  { code: "OB-SP06", name: "OB-SP06", category: "Suits & Pants", price: 0, discount: 0, desc: "Dark grey waistcoat and trousers set highlighting a double-breasted vest with fine pinstripe inner lining.", images: ["assets/products/SUITS AND PANTS/OB-SP06/IMG_0473.jpg","assets/products/SUITS AND PANTS/OB-SP06/IMG_0476.jpg"] },
  { code: "OB-SP07", name: "OB-SP07", category: "Suits & Pants", price: 0, discount: 0, desc: "Sophisticated solid black tuxedo jacket featuring black satin shawl lapels and a matching black vest.", images: ["assets/products/SUITS AND PANTS/OB-SP07/3b7b692e-e2d3-4647-8b1e-ac1191c22e6f.jpg"] },
  { code: "OB-SP08", name: "OB-SP08", category: "Suits & Pants", price: 0, discount: 0, desc: "Forest green double-breasted suit jacket styled with polished gold buttons and an elegant lapel chain pin.", images: ["assets/products/SUITS AND PANTS/OB-SP08/498921890_18330200977167858_2899624696774555259_n.jpg"] },
  { code: "OB-SP09", name: "OB-SP09", category: "Suits & Pants", price: 0, discount: 0, desc: "Three-piece tailored executive suit in deep navy blue featuring a structured vest and flat-front trousers.", images: ["assets/products/SUITS AND PANTS/OB-SP09/Photo from Oban Wears(1).jpg","assets/products/SUITS AND PANTS/OB-SP09/Photo from Oban Wears(2).jpg","assets/products/SUITS AND PANTS/OB-SP09/Photo from Oban Wears.jpg"] },
  { code: "OB-SP10", name: "OB-SP10", category: "Suits & Pants", price: 0, discount: 0, desc: "Modern slim-fit double-breasted suit in charcoal grey featuring peak lapels and horn buttons.", images: ["assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears(1).jpg","assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears(2).jpg","assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears(3).jpg","assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears.jpg"] }
];

function normalizeCategory(cat) {
  if (!cat) return "";
  const c = cat.toString().trim().toLowerCase();
  if (c === "kaftan" || c === "kaftans") return "Kaftans";
  if (c === "agbada" || c === "agbadas") return "Agbada";
  if (c === "suit" || c === "suits" || c.includes("suit")) return "Suits & Pants";
  if (c.includes("father") || c.includes("son")) return "Father & Son";
  return cat;
}

function sortCatalog(list) {
  if (!list || !list.length) return list || [];
  list.forEach(item => { if (item) item.category = normalizeCategory(item.category); });
  const categoryOrder = { "Kaftans": 1, "Agbada": 2, "Father & Son": 3, "Suits & Pants": 4 };
  return list.sort((a, b) => {
    const catA = categoryOrder[a.category] || 99;
    const catB = categoryOrder[b.category] || 99;
    if (catA !== catB) return catA - catB;
    const posA = typeof a.position === "number" ? a.position : 999;
    const posB = typeof b.position === "number" ? b.position : 999;
    if (posA !== posB) return posA - posB;
    const codeA = (a.code || "").toUpperCase();
    const codeB = (b.code || "").toUpperCase();
    return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
  });
}

let products = JSON.parse(localStorage.getItem("oban-products"));
if (!products || !products.length || !products.some(p => p && p.code)) {
  products = JSON.parse(JSON.stringify(defaultInventory));
}
products.forEach(p => { if (p) p.category = normalizeCategory(p.category); });
products = sortCatalog(products);
localStorage.setItem("oban-products", JSON.stringify(products));

// Immediately fetch fresh products from server database on page load
(function() {
  const apiBase = (window.location.hostname.includes("dashboard") || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") ? "api.php" : "https://dashboard.obanwears.com/api.php";
  fetch(apiBase + "?key=oban-products")
    .then(r => r.ok ? r.json() : null)
    .then(serverProducts => {
      if (serverProducts && Array.isArray(serverProducts) && serverProducts.length && serverProducts.some(p => p && p.code)) {
        products = sortCatalog(serverProducts.map(p => { if (p) p.category = normalizeCategory(p.category); return p; }));
        if (typeof renderProducts === "function") renderProducts();
      }
    })
    .catch(() => {});
})();

const money=n=>n?new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n):"Price on request";
const getProductPrice=p=>p?(p.discount>0?Math.round(p.price*(1-p.discount/100)):p.price):0;
// Decode HTML entities in data-collection (e.g. "Suits &amp; Pants" -> "Suits & Pants")
const rawCollection = document.body.dataset.collection || "All";
const entityDecoder = document.createElement("textarea");
entityDecoder.innerHTML = rawCollection;
let activeFilter = normalizeCategory(entityDecoder.value);
let searchTerm="",sortMode="featured",cardTimers=[],dialogTimer;
let cart=JSON.parse(localStorage.getItem("oban-cart")||"[]").filter(line=>products.some(p=>p.code===line.id||p.code===line.code));
const grid=document.querySelector("#productGrid"),empty=document.querySelector("#emptyState");

function productCard(p){
  const visual=p.images?.length?`<div class="product-gallery" data-gallery-index="0"><img class="product-photo" src="${p.images[0]}" alt="${p.name}, view 1" loading="lazy"><span class="gallery-count">1 / ${p.images.length}</span>${p.images.length>1?'<button class="gallery-prev" aria-label="Previous view">&lsaquo;</button><button class="gallery-next" aria-label="Next view">&rsaquo;</button>':""}<span class="zoom-hint">View &amp; zoom</span></div>`:`<div class="garment" style="background:${p.color}"></div>`;
  const discountVal = p.discount || 0;
  let priceHTML = `<strong>${money(p.price)}</strong>`;
  if (discountVal > 0) {
    const discountPrice = Math.round(p.price * (1 - discountVal / 100));
    const amountSaved = p.price - discountPrice;
    priceHTML = `<span class="actualPrice" style="text-decoration:line-through;color:#8c867c;font-size:12px;margin-right:8px;">${money(p.price)}</span><strong class="discountPrice" style="color:#d4af37;">${money(discountPrice)}</strong><br><span class="amountSaved" style="font-size:11px;color:#d4af37;font-weight:600;">Save ${money(amountSaved)}</span>`;
  }
  return `<article class="product-card" data-id="${p.code||p.id}"><div class="product-art" style="background:${p.bg||'#eee5d5'}" role="button" tabindex="0" aria-label="View ${p.name}">${visual}</div><div class="product-meta"><h3>${p.name}</h3><p>${priceHTML}</p><small>${p.category}${p.tag?` \u00B7 ${p.tag}`:""}</small><button class="add" aria-label="Add ${p.name} to cart">+</button></div></article>`;
}

function setCardImage(card,p,index){
  const gallery=card.querySelector(".product-gallery");if(!gallery||!p.images?.length)return;
  index=(index+p.images.length)%p.images.length;gallery.dataset.galleryIndex=index;
  const img=gallery.querySelector("img");img.classList.add("changing");
  setTimeout(()=>{img.src=p.images[index];img.alt=`${p.name}, view ${index+1}`;gallery.querySelector(".gallery-count").textContent=`${index+1} / ${p.images.length}`;img.classList.remove("changing")},140);
}
function startCardGalleries(){
  cardTimers.forEach(clearInterval);cardTimers=[];
  grid.querySelectorAll(".product-card").forEach((card,offset)=>{
    const pid=card.dataset.id;
    const p=products.find(x=>(x.code||String(x.id))===pid);
    const gallery=card.querySelector(".product-gallery");if(!gallery||!p||!p.images||p.images.length<2)return;
    const move=step=>setCardImage(card,p,+gallery.dataset.galleryIndex+step);
    gallery.querySelector(".gallery-prev").onclick=e=>{e.stopPropagation();move(-1)};
    gallery.querySelector(".gallery-next").onclick=e=>{e.stopPropagation();move(1)};
    const timer=setInterval(()=>move(1),3600+offset*110);cardTimers.push(timer);
  });
}
function renderProducts(){
  const isHomepage = document.body.classList.contains("home-page");
  
  let list=products.filter(p=>{
    const pCat = normalizeCategory(p.category);
    const normFilter = normalizeCategory(activeFilter);
    const matchesCategory = (normFilter === "All" || pCat === normFilter);
    const matchesSearch = `${p.name||""} ${p.code||""}`.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if(sortMode==="low")list.sort((a,b)=>getProductPrice(a)-getProductPrice(b));
  if(sortMode==="high")list.sort((a,b)=>getProductPrice(b)-getProductPrice(a));
  if(sortMode==="new")list.sort((a,b)=>(b.date||0)-(a.date||0));

  // On the index.html Homepage: show strictly ONLY items marked featured by admin
  if(isHomepage && activeFilter === "All" && !searchTerm){
    const hasFeatured = list.some(p => p.featured);
    if (hasFeatured) {
      // ONLY items explicitly toggled as Featured by the admin will be shown
      list = list.filter(p => p.featured);
    } else {
      // Fallback initial sample until admin toggles their first featured item
      let kCount=0,aCount=0,fCount=0,sCount=0;
      list=list.filter(p=>{
        const cat = normalizeCategory(p.category);
        if(cat==="Kaftans")return++kCount<=4;
        if(cat==="Agbada")return++aCount<=4;
        if(cat==="Father & Son")return++fCount<=2;
        if(cat==="Suits & Pants")return++sCount<=2;
        return false;
      });
    }
  }
  grid.innerHTML=list.map(productCard).join("");empty.style.display=list.length?"none":"block";
  grid.querySelectorAll(".product-card").forEach(card=>{
    const pid=card.dataset.id;
    const p=products.find(x=>(x.code||String(x.id))===pid);
    if(!p)return;
    card.querySelector(".add").onclick=()=>addToCart(pid);
    const art=card.querySelector(".product-art");
    art.onclick=()=>openProduct(pid);
    art.onkeydown=e=>{if(e.key==="Enter"||e.key===" ")openProduct(pid)};
  });
  startCardGalleries();
}

document.querySelectorAll("button.filter[data-filter]").forEach(btn=>btn.onclick=()=>{activeFilter=normalizeCategory(btn.dataset.filter);document.querySelectorAll("button.filter").forEach(b=>b.classList.toggle("active",b===btn));renderProducts()});
document.querySelectorAll("[data-category-jump]").forEach(btn=>btn.onclick=()=>{activeFilter=normalizeCategory(btn.dataset.categoryJump);document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));renderProducts();document.querySelector("#shop").scrollIntoView()});
document.querySelector("#sortProducts").onchange=e=>{sortMode=e.target.value;renderProducts()};

const searchPanel=document.querySelector("#searchPanel"),searchInput=document.querySelector("#siteSearch");
document.querySelector("#searchToggle").onclick=()=>{searchPanel.classList.add("open");setTimeout(()=>searchInput.focus(),300)};
document.querySelector("#closeSearch").onclick=()=>searchPanel.classList.remove("open");
searchInput.oninput=e=>{searchTerm=e.target.value.trim().toLowerCase();renderProducts();document.querySelector("#shop").scrollIntoView({behavior:"smooth"})};
const menu=document.querySelector("#mobileNav"),menuButton=document.querySelector("#menuButton");
menuButton.onclick=()=>{const open=menu.classList.toggle("open");menuButton.setAttribute("aria-expanded",open)};
menu.querySelectorAll("a").forEach(a=>a.onclick=()=>{menu.classList.remove("open");menuButton.setAttribute("aria-expanded","false")});

const drawer=document.querySelector("#cartDrawer"),overlay=document.querySelector("#overlay");
function setDrawer(open){drawer.classList.toggle("open",open);overlay.classList.toggle("open",open);drawer.setAttribute("aria-hidden",!open);document.body.style.overflow=open?"hidden":""}
document.querySelector("#cartButton").onclick=()=>setDrawer(true);document.querySelector("#closeCart").onclick=()=>setDrawer(false);overlay.onclick=()=>setDrawer(false);const startShopping=document.querySelector("#startShopping");if(startShopping)startShopping.onclick=()=>setDrawer(false);
function saveCart(){localStorage.setItem("oban-cart",JSON.stringify(cart));renderCart()}
function addToCart(id,size="M"){const line=cart.find(x=>(x.id===id||x.code===id)&&x.size===size);line?line.qty++:cart.push({id,code:id,size,qty:1});saveCart();toast("Added to your cart")}
function changeQty(index,change){cart[index].qty+=change;if(cart[index].qty<1)cart.splice(index,1);saveCart()}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  const countEl=document.querySelector("#cartCount");if(countEl)countEl.textContent=count;
  const items=document.querySelector("#cartItems"),isEmpty=!cart.length;
  if(document.querySelector("#cartEmpty"))document.querySelector("#cartEmpty").style.display=isEmpty?"block":"none";
  if(document.querySelector("#cartSummary"))document.querySelector("#cartSummary").style.display=isEmpty?"none":"block";
  if(!items)return;
  items.innerHTML=cart.map((line,i)=>{
    const p=products.find(x=>(x.code||String(x.id))===(line.code||line.id));
    if(!p)return"";
    const thumb=p.images?.[0]?`<img src="${p.images[0]}" alt="${p.name}">`:`<span style="--swatch:${p.color||'#ccc'}"></span>`;
    return `<div class="cart-item"><div class="cart-swatch" style="--swatch:${p.color||'#ccc'};background:${p.bg||'#eee'}">${thumb}</div><div><h4>${p.name}</h4><p><strong>${money(getProductPrice(p))}</strong></p><div class="qty"><button data-minus="${i}">-</button><span>${line.qty}</span><button data-plus="${i}">+</button></div></div><button class="remove-item" data-remove="${i}" aria-label="Remove ${p.name}">\u00D7</button></div>`;
  }).join("");
  const total=cart.reduce((sum,line)=>{
    const p=products.find(x=>(x.code||String(x.id))===(line.code||line.id));
    return sum+(p?getProductPrice(p):0)*line.qty;
  },0);
  if(document.querySelector("#cartTotal"))document.querySelector("#cartTotal").textContent=total?money(total):"Price on request";
  items.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.minus,-1));
  items.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.plus,1));
  items.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);saveCart()});
}

const dialog=document.querySelector("#productDialog"),dialogContent=document.querySelector("#dialogContent");
function openProduct(id){
  const p=products.find(x=>(x.code||String(x.id))===String(id));
  if(!p)return;
  const images=p.images||[];
  const gallery=images.length?`<div class="dialog-gallery"><div class="zoom-stage"><img class="zoom-image" src="${images[0]}" alt="${p.name}, view 1"><span class="zoom-instruction">Move to zoom \u00B7 click to hold</span></div>${images.length>1?`<button class="dialog-prev" aria-label="Previous image">&lsaquo;</button><button class="dialog-next" aria-label="Next image">&rsaquo;</button><div class="dialog-thumbs">${images.map((src,i)=>`<button class="${i===0?"active":""}" data-image="${i}"><img src="${src}" alt="View ${i+1}"></button>`).join("")}</div>`:""}</div>`:`<div class="dialog-art"><div class="garment" style="--swatch:${p.color||'#ccc'}"></div></div>`;
  const discountVal = p.discount || 0;
  let priceHTML = `<p class="dialog-price"><strong>${money(p.price)}</strong></p>`;
  if (discountVal > 0) {
    const discountPrice = Math.round(p.price * (1 - discountVal / 100));
    const amountSaved = p.price - discountPrice;
    priceHTML = `<p class="dialog-price"><span class="actualPrice" style="text-decoration:line-through;color:#8c867c;font-size:14px;margin-right:8px;">${money(p.price)}</span><strong class="discountPrice" style="color:#d4af37;font-size:22px;">${money(discountPrice)}</strong><br><span class="amountSaved" style="font-size:13px;color:#d4af37;font-weight:600;">Save ${money(amountSaved)} (${discountVal}% off)</span></p>`;
  }
  dialogContent.innerHTML=`<div class="dialog-layout">${gallery}<div class="dialog-copy"><p class="eyebrow">${p.category}${p.tag?` \u00B7 ${p.tag}`:""}</p><h2>${p.name}</h2>${priceHTML}<p class="dialog-description">${p.desc||p.description||""}</p><button class="dialog-add">Add to cart</button></div></div>`;
  let size="M",imageIndex=0;
  const selectImage=index=>{if(!images.length)return;imageIndex=(index+images.length)%images.length;const main=dialogContent.querySelector(".zoom-image");if(main){main.src=images[imageIndex];main.alt=`${p.name}, view ${imageIndex+1}`;}dialogContent.querySelectorAll("[data-image]").forEach((b,i)=>b.classList.toggle("active",i===imageIndex))};
  dialogContent.querySelectorAll("[data-image]").forEach(b=>b.onclick=()=>selectImage(+b.dataset.image));
  const prev=dialogContent.querySelector(".dialog-prev"),next=dialogContent.querySelector(".dialog-next");if(prev)prev.onclick=()=>selectImage(imageIndex-1);if(next)next.onclick=()=>selectImage(imageIndex+1);
  if(images.length>1){clearInterval(dialogTimer);dialogTimer=setInterval(()=>selectImage(imageIndex+1),3800)}
  const stage=dialogContent.querySelector(".zoom-stage");if(stage){stage.onmousemove=e=>{const r=stage.getBoundingClientRect();stage.style.setProperty("--zoom-x",`${(e.clientX-r.left)/r.width*100}%`);stage.style.setProperty("--zoom-y",`${(e.clientY-r.top)/r.height*100}%`)};stage.onclick=()=>stage.classList.toggle("zoom-locked")}
  dialogContent.querySelector(".dialog-add").onclick=()=>{addToCart(id);closeProduct();setDrawer(true)};dialog.showModal();
}
function closeProduct(){clearInterval(dialogTimer);dialog.close()}
document.querySelector("#closeDialog").onclick=closeProduct;dialog.onclick=e=>{if(e.target===dialog)closeProduct()};
function toast(message){const el=document.querySelector("#toast");el.textContent=message;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),1800)}
document.querySelector("#checkoutButton").onclick = () => {
  if (!cart.length) {
    toast("Your cart is empty");
    return;
  }
  openCheckoutDetailsModal();
};

function openCheckoutDetailsModal() {
  let modal = document.querySelector("#checkoutDetailsModal");
  if (!modal) {
    modal = document.createElement("dialog");
    modal.id = "checkoutDetailsModal";
    modal.style.border = "1px solid var(--line)";
    modal.style.background = "var(--white)";
    modal.style.padding = "28px";
    modal.style.width = "min(400px, 100vw - 32px)";
    modal.style.boxShadow = "0 10px 40px rgba(0,0,0,0.15)";
    modal.style.borderRadius = "4px";
    
    modal.innerHTML = `
      <h3 style="font-family:'Manrope',sans-serif;font-size:18px;font-weight:500;margin:0 0 16px;color:var(--ink);">Secure your order</h3>
      <p style="color:#8c867c;font-size:12px;margin:0 0 20px;line-height:1.5;">Enter your details to complete your order tracking setup and connect with our team.</p>
      <form id="checkoutDetailsForm">
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#8c867c;margin-bottom:6px;">Full Name</label>
          <input type="text" id="custFullName" style="width:100%;border:1px solid var(--line);padding:8px 12px;font-size:12px;outline:none;" required autocomplete="name">
        </div>
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#8c867c;margin-bottom:6px;">Email Address</label>
          <input type="email" id="custEmail" style="width:100%;border:1px solid var(--line);padding:8px 12px;font-size:12px;outline:none;" required autocomplete="email">
        </div>
        <div style="margin-bottom:20px;">
          <label style="display:block;font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#8c867c;margin-bottom:6px;">WhatsApp Number</label>
          <input type="tel" id="custWhatsApp" placeholder="e.g. +2348168003732" style="width:100%;border:1px solid var(--line);padding:8px 12px;font-size:12px;outline:none;" required autocomplete="tel">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:12px;">
          <button type="button" id="closeCheckoutDetailsBtn" style="background:transparent;border:1px solid var(--line);color:var(--text);padding:8px 16px;cursor:pointer;font-size:12px;">Cancel</button>
          <button type="submit" style="background:var(--gold);color:var(--ink);border:none;font-weight:600;padding:8px 16px;cursor:pointer;font-size:12px;">Secure your order</button>
        </div>
      </form>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector("#closeCheckoutDetailsBtn").onclick = () => modal.close();
    
    modal.querySelector("#checkoutDetailsForm").onsubmit = (e) => {
      e.preventDefault();
      const nameVal = modal.querySelector("#custFullName").value.trim();
      const emailVal = modal.querySelector("#custEmail").value.trim();
      const whatsappVal = modal.querySelector("#custWhatsApp").value.trim();
      modal.close();
      executeCheckout(nameVal, emailVal, whatsappVal);
    };
  }
  
  const loggedEmail = localStorage.getItem("oban-client-logged-in-email");
  if (loggedEmail) {
    const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
    const p = profiles[loggedEmail];
    if (p) {
      modal.querySelector("#custFullName").value = p.name || "";
      modal.querySelector("#custEmail").value = p.email || "";
      modal.querySelector("#custWhatsApp").value = p.whatsapp || "";
    }
  }
  
  modal.showModal();
}

function executeCheckout(nameVal, emailVal, whatsappVal) {
  try {
    const prefix = "OB";
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const orderRef = prefix + randomNumber + randomLetter;
    
    let itemsDescription = [];
    cart.forEach((line) => {
      const p = products.find(x => (x.code||String(x.id)) === (line.code||line.id));
      if (p) {
        itemsDescription.push(`${p.name} (Size ${line.size}, Quantity ${line.qty})`);
      }
    });
    const itemsStr = itemsDescription.join(", ");
    const total = cart.reduce((sum, line) => {
      const p = products.find(x => (x.code||String(x.id)) === (line.code||line.id));
      return sum + (p ? getProductPrice(p) : 0) * line.qty;
    }, 0);
    
    const d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateStr = `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
    
    const loggedEmail = localStorage.getItem("oban-client-logged-in-email");
    let measurements = null;
    if (loggedEmail) {
      const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
      const p = profiles[loggedEmail];
      if (p && p.measurements) {
        measurements = p.measurements;
      }
    }
    
    const newOrder = {
      ref: orderRef,
      name: nameVal,
      email: emailVal,
      whatsapp: whatsappVal,
      piece: itemsStr,
      total: total,
      currentStage: 1, // Waiting for Payment
      date: dateStr,
      measurements: measurements
    };
    
    let ordersDb = JSON.parse(localStorage.getItem("oban-orders")) || [];
    ordersDb.push(newOrder);
    localStorage.setItem("oban-orders", JSON.stringify(ordersDb));
    
    // Sync to SQLite Database (api.php)
    try {
      fetch(apiEndpoint("oban-orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ordersDb)
      }).catch(e => console.warn("Order API sync warning:", e));
    } catch (e) {}
    
    let message = `Hello Oban Wears, I would like to place an order (Order Reference: ${orderRef}):\n\n`;
    message += `Customer Name: ${nameVal}\n`;
    message += `Email Address: ${emailVal}\n`;
    message += `WhatsApp Number: ${whatsappVal}\n\n`;
    
    cart.forEach((line) => {
      const p = products.find(x => x.id === line.id);
      if (p) {
        message += `* ${p.name} (Quantity ${line.qty}) at ${money(getProductPrice(p))}\n`;
      }
    });
    
    message += `\nSubtotal: ${money(total)}\n\n`;
    message += "Please share the payment details to complete my order.";
    
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348168003732?text=${encodedText}`;
    
    cart = [];
    saveCart();
    setDrawer(false);
    
    window.open(whatsappUrl, "_blank");
  } catch (error) {
    console.log("Checkout failed:", error);
    toast("Checkout failed, please try again");
  }
}

function apiEndpoint(key) {
  if (window.location.hostname.includes("vercel.app")) {
    const cleanKey = key.replace("oban-", "");
    return `/api/${cleanKey}`;
  }
  if (window.location.hostname.includes("dashboard") || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") {
    return `api.php?key=${key}`;
  }
  return `https://dashboard.obanwears.com/api.php?key=${key}`;
}

const newsletter=document.querySelector("#newsletterForm");
if(newsletter) {
  newsletter.onsubmit=async e=>{
    e.preventDefault();
    const emailInput = document.querySelector("#newsletterEmail");
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
    if (email) {
      const subData = {
        email: email,
        timestamp: new Date().toISOString()
      };
      
      // Save to LocalStorage
      const localSubscribers = JSON.parse(localStorage.getItem("oban-subscribers") || "{}");
      localSubscribers[email] = subData;
      localStorage.setItem("oban-subscribers", JSON.stringify(localSubscribers));
      
      // Sync to SQLite Database (api.php)
      try {
        fetch(apiEndpoint("oban-subscribers"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(localSubscribers)
        }).catch(err => console.warn("Subscriber API sync warning:", err));
      } catch (err) {}

      document.querySelector("#formMessage").textContent="You're on the list. Welcome to Oban.";
      e.target.reset();
    }
  };
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){setDrawer(false);searchPanel.classList.remove("open");if(dialog.open)closeProduct()}});
const heroSlides=[...document.querySelectorAll(".campaign-slide")],heroDots=[...document.querySelectorAll("[data-hero-slide]")];
if(heroSlides.length){let heroIndex=0,heroTimer;const showHero=index=>{heroIndex=(index+heroSlides.length)%heroSlides.length;heroSlides.forEach((slide,i)=>slide.classList.toggle("active",i===heroIndex));heroDots.forEach((dot,i)=>dot.classList.toggle("active",i===heroIndex))};const restartHero=()=>{clearInterval(heroTimer);heroTimer=setInterval(()=>showHero(heroIndex+1),4500)};heroDots.forEach(dot=>dot.onclick=()=>{showHero(+dot.dataset.heroSlide);restartHero()});restartHero()}
// Rotate hero CTA link to keep it dynamic and fresh
const shopLinks = [
  { text: "Shop Kaftans", href: "kaftans.html" },
  { text: "Shop Agbada", href: "agbada.html" },
  { text: "Shop Suits", href: "suits.html" },
  { text: "Shop Father & Son", href: "father-son.html" }
];
const heroShopLink = document.querySelector("#heroShopLink");
if (heroShopLink) {
  let linkIndex = 0;
  setInterval(() => {
    linkIndex = (linkIndex + 1) % shopLinks.length;
    heroShopLink.classList.add("fade-out");
    setTimeout(() => {
      heroShopLink.href = shopLinks[linkIndex].href;
      heroShopLink.innerHTML = `${shopLinks[linkIndex].text} <span>&#8599;</span>`;
      heroShopLink.classList.remove("fade-out");
    }, 300);
  }, 4000);
}

renderProducts();renderCart();

// Promotional Popup
function initPromoPopup() {
  if (!document.querySelector(".hero-v2")) return;
  const popup = document.createElement("div");
  popup.className = "promopopup";
  popup.innerHTML = `
    <button class="promoclose" aria-label="Close promotion">&times;</button>
    <h3>Welcome to Oban Wears!</h3>
    <div class="promooffer">Get 10% off your first order</div>
    <p>Elevate your style with timeless craftsmanship. Whether it is the commanding silhouette of a grand Agbada or the sharp, modern lines of a tailored Kaftan, our pieces are designed to make you the best dressed man in any room.</p>
  `;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 1000);

  const closeBtn = popup.querySelector(".promoclose");
  const closePopup = () => {
    popup.classList.remove("show");
    window.removeEventListener("scroll", handleScroll);
  };
  
  closeBtn.onclick = closePopup;

  let initialScrollY = window.scrollY;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - initialScrollY) > 80) {
      closePopup();
    }
  };

  setTimeout(() => {
    window.addEventListener("scroll", handleScroll);
  }, 1000);
}

// Floating Navigation (Scroll up/down)
function initScrollNav() {
  const btn = document.createElement("button");
  btn.className = "scrollnav";
  btn.setAttribute("aria-label", "Scroll page");
  btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`;
  document.body.appendChild(btn);

  const updateArrow = () => {
    const halfHeight = document.documentElement.scrollHeight / 2;
    if (window.scrollY > halfHeight) {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7-7"/></svg>`;
      btn.dataset.dir = "up";
    } else {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`;
      btn.dataset.dir = "down";
    }
  };

  btn.onclick = () => {
    if (btn.dataset.dir === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  window.addEventListener("scroll", updateArrow);
  updateArrow();
}

// Floating WhatsApp Icon
function initWhatsAppFloat() {
  const link = document.createElement("a");
  link.className = "whatsappfloat";
  link.href = "https://wa.me/2348168003732";
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "Chat on WhatsApp");
  link.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.768 2.589-5.768 5.77 0 1.214.374 2.348 1.02 3.285l-.665 2.434 2.493-.654c.895.549 1.947.871 3.07.871 3.184 0 5.767-2.589 5.767-5.77 0-3.182-2.583-5.77-5.767-5.77zm3.39 8.161c-.144.405-.838.752-1.155.77-.318.016-.607-.074-1.862-.593-1.603-.665-2.616-2.302-2.695-2.408-.078-.106-.63-.84-.63-1.602 0-.762.399-1.135.543-1.285.145-.15.318-.188.423-.188.106 0 .213.003.304.007.096.004.225-.036.353.272.13.315.446 1.085.485 1.163.039.078.065.17.013.275-.052.106-.078.17-.156.26-.077.09-.16.2-.232.278-.078.09-.16.188-.069.344.09.156.402.666.862 1.077.593.53 1.093.693 1.249.77.156.078.247.065.339-.039.09-.104.399-.465.505-.623.106-.159.213-.133.359-.078.146.055.926.437 1.085.516.159.079.266.118.305.185.039.066.039.385-.105.79zM12 0C5.373 0 0 5.373 0 12c0 2.103.543 4.137 1.572 5.93L0 24l6.29-1.65A11.916 11.916 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.922 0-3.8-.507-5.44-1.46l-.39-.23-3.71.97.99-3.62-.25-.4A9.923 9.923 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>`;
  document.body.appendChild(link);
}

// Automatically scrolling Ticker Announcement Bar
function initAnnouncementBar() {
  try {
    const bar = document.querySelector(".announcement");
    if (!bar) return;

    const announcements = [
      "Complimentary delivery in Nigeria on orders over \u20A6300,000",
      "Get 10% off your first order | Welcome to Oban Wears",
      "Exquisite craftsmanship tailored for the modern gentleman",
      "Global shipping available on all premium collections"
    ];

    let index = 0;
    bar.style.overflow = "hidden";
    bar.style.position = "relative";

    const slide = document.createElement("div");
    slide.textContent = announcements[0];
    slide.style.width = "100%";
    slide.style.height = "100%";
    slide.style.display = "grid";
    slide.style.placeItems = "center";
    slide.style.whiteSpace = "nowrap";
    slide.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    slide.style.transform = "translateX(0)";
    slide.style.opacity = "1";

    bar.innerHTML = "";
    bar.appendChild(slide);

    setInterval(() => {
      const nextIndex = (index + 1) % announcements.length;
      
      // 1. Slide out current
      if (index % 2 === 0) {
        // Even index exits to the right (evades to right)
        slide.style.transform = "translateX(100%)";
      } else {
        // Odd index exits to the left (ended to left)
        slide.style.transform = "translateX(-100%)";
      }
      slide.style.opacity = "0";

      setTimeout(() => {
        // 2. Prepare next slide position before showing
        if (nextIndex % 2 === 0) {
          // Next is even: enters from the left
          slide.style.transform = "translateX(-100%)";
        } else {
          // Next is odd: enters from the right
          slide.style.transform = "translateX(100%)";
        }
        slide.textContent = announcements[nextIndex];
        
        // Force a reflow
        slide.offsetWidth;

        // 3. Slide in to center
        slide.style.transform = "translateX(0)";
        slide.style.opacity = "1";
        
        index = nextIndex;
      }, 500);

    }, 4000);

  } catch (error) {
    console.log("Announcement bar initialization failed:", error);
  }
}

function initGlobals() {
  initAnnouncementBar();
  initPromoPopup();
  initScrollNav();
  initWhatsAppFloat();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobals);
} else {
  initGlobals();
}

// Mobile menu collapsible sub-menus
(function() {
  function initCollapsibleMobileNav() {
    const mobileNav = document.querySelector("#mobileNav");
    if (!mobileNav) return;

    const normalizePath = (path) => path.replace(/\.html$/, "").replace(/^\//, "").split("/").pop() || "index";
    const currentClean = normalizePath(window.location.pathname);

    const menuData = [
      { type: "link", label: "Home", href: "/" },
      { type: "link", label: "About", href: "about" },
      {
        type: "submenu",
        label: "Shop",
        items: [
          { label: "Shop All", href: "shop" },
          { label: "Kaftans", href: "kaftans" },
          { label: "Agbada", href: "agbada" },
          { label: "Suits", href: "suits" },
          { label: "Father & Son", href: "father-son" }
        ]
      },
      { type: "link", label: "Blog", href: "blog" },
      { type: "link", label: "Contact", href: "contact" },
      { type: "link", label: "FAQ", href: "faq" },
      {
        type: "submenu",
        label: "My Profile",
        items: [
          { label: "My Profile", href: "profile" },
          { label: "Track Order", href: "tracker" }
        ]
      }
    ];

    let html = "";
    menuData.forEach((item, index) => {
      if (item.type === "link") {
        const isActive = normalizePath(item.href) === currentClean ? 'class="active-page"' : '';
        html += `<a href="${item.href}" ${isActive}>${item.label}</a>`;
      } else if (item.type === "submenu") {
        const hasActiveChild = item.items.some(child => normalizePath(child.href) === currentClean);
        const activeClass = hasActiveChild ? "active-page" : "";
        
        let submenuHtml = "";
        item.items.forEach(child => {
          const isChildActive = normalizePath(child.href) === currentClean ? 'class="active-page"' : '';
          submenuHtml += `<a href="${child.href}" ${isChildActive} style="padding-left: 20px; font-size: 11px; opacity: 0.85; display: block; margin: 5px 0;">${child.label}</a>`;
        });

        html += `
          <div class="mobile-nav-group" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            <button class="mobile-nav-trigger ${activeClass}" data-group-index="${index}" style="background: transparent; border: none; text-align: left; padding: 0; font-size: 12px; font-weight: 500; cursor: pointer; color: inherit; display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <span>${item.label}</span>
              <span class="trigger-icon" style="transition: transform 0.25s; font-size: 12px; font-weight: bold; margin-left: 5px;">${hasActiveChild ? "-" : "+"}</span>
            </button>
            <div class="mobile-nav-submenu" style="display: ${hasActiveChild ? "flex" : "none"}; flex-direction: column; gap: 8px; margin-top: 5px; border-left: 1px solid var(--line); padding-left: 10px; width: 100%;">
              ${submenuHtml}
            </div>
          </div>
        `;
      }
    });

    mobileNav.innerHTML = html;

    // Bind triggers
    mobileNav.querySelectorAll(".mobile-nav-trigger").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const group = btn.closest(".mobile-nav-group");
        const submenu = group.querySelector(".mobile-nav-submenu");
        const icon = btn.querySelector(".trigger-icon");
        const isVisible = submenu.style.display === "flex";
        
        submenu.style.display = isVisible ? "none" : "flex";
        icon.textContent = isVisible ? "+" : "-";
      };
    });

    // Close menu on sub-link click
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        const menuButton = document.querySelector("#menuButton");
        mobileNav.classList.remove("open");
        if (menuButton) menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCollapsibleMobileNav);
  } else {
    initCollapsibleMobileNav();
  }
})();

// -------------------------------------------------------------
// -------------------------------------------------------------
// LOCAL HOSTING DATABASE SYNCHRONIZATION
// -------------------------------------------------------------
(function() {
  const allowedKeys = [
    "oban-products", "oban-orders", "oban-subscribers", "oban-blog-articles"
  ];

  async function syncKeyToHosting(key, value) {
    if (!allowedKeys.includes(key)) return;
    try {
      const apiBase = (window.location.hostname.includes("dashboard") || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") ? "api.php" : "https://dashboard.obanwears.com/api.php";
      await fetch(apiBase + "?key=" + key, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: value
      });
    } catch (err) {
      console.error(`Sync network error for key ${key}:`, err);
    }
  }

  // Override localStorage
  const memCache = {};
  const originalGetItem = localStorage.getItem;
  localStorage.getItem = function(key) {
    if (memCache.hasOwnProperty(key)) {
      return memCache[key];
    }
    return originalGetItem.apply(this, arguments);
  };

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    memCache[key] = value;
    let localSucceeded = false;
    try {
      originalSetItem.apply(this, arguments);
      localSucceeded = true;
    } catch (e) {
      console.warn("Storage quota exceeded for key:", key, e);
    }

    syncKeyToHosting(key, value);

    if (!localSucceeded) {
      throw new DOMException("Failed to execute 'setItem' on 'Storage': Setting the value exceeded the quota.", "QuotaExceededError");
    }
  };

  function triggerUIRefresh(key, val) {
    if (key === "oban-products") {
      if (typeof products !== "undefined") {
        products = sortCatalog(val);
        if (typeof renderProducts === "function") {
          renderProducts();
        }
      }
    }
  }

  let localVersions = {};

  async function checkCloudUpdates() {
    try {
      const apiBase = (window.location.hostname.includes("dashboard") || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") ? "api.php" : "https://dashboard.obanwears.com/api.php";
      const res = await fetch(apiBase + "?key=oban-version");
      if (!res.ok) return;
      const cloudVersions = await res.json();
      if (!cloudVersions) return;
      
      for (const key of Object.keys(cloudVersions)) {
        if (allowedKeys.includes(key) && localVersions[key] !== cloudVersions[key]) {
          const dataRes = await fetch(apiBase + "?key=" + key);
          if (dataRes.ok) {
            const val = await dataRes.json();
            if (val !== null) {
              const newStr = JSON.stringify(val);
              originalSetItem.call(localStorage, key, newStr);
              memCache[key] = newStr;
              triggerUIRefresh(key, val);
            }
          }
          localVersions[key] = cloudVersions[key];
        }
      }
    } catch(e) {
      console.error("Failed to check hosting database updates:", e);
    }
  }

  // Polling interval for customers (every 30 seconds)
  setInterval(checkCloudUpdates, 30000);
  
  // Initial sync on page load
  checkCloudUpdates();
})();

