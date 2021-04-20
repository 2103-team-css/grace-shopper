const { UUID } = require('sequelize/types');
const { db, Users, Products, Cart } = require('./server/db');


const users = [
    {
        email: "chiararocksono@test.io",
        password: "chiarapw",
        isAdmin: false,
        fullname: "Chiara Wahsono"
    },
    {
        email: "kavinmetal@test.io",
        password: "kavinpw",
        isAdmin: true,
        fullname: "Kavin Thanesjesdapong"
    },
    {
        email: "chrisonthedrums@test.io",
        password: "chrispw",
        isAdmin: false,
        fullname: "Christopher Gil Martins"
    },
    {
        email: "meanjean@test.io",
        password: "jeanettepw",
        isAdmin: false,
        fullname: "Jeanette Abell"
    },
    {
        email: "somebodyelse@test.io",
        password: "somepw",
        isAdmin: false,
        fullname: "Betty Blue"
    },
];

const imageShuffler = () => {
    //randomly select an image from appropriate list
}

const drumsImages = [
    "https://learnex.com.mx/home/wp-content/uploads/2018/02/drums-1024x697.jpg",
    "https://bothners.co.za/wp-content/uploads/2018/12/Mapex-PRODIGY-5-Piece-RED-ROCK-SIZES-DRUMKIT.jpg",
    "https://bothners.co.za/wp-content/uploads/2018/12/Mapex-PRODIGY-5-Piece-RED-ROCK-SIZES-DRUMKIT.jpg",
    "https://purepng.com/public/uploads/large/purepng.com-drums-kitdrummusicinstrumentsmetallicdrums-kit-1421526504303lhvbk.png",
    "https://www.long-mcquade.com/files/11499/lg_342348.JPG",
    "https://www.promenademusic.co.uk/image/cache/data/bev_stadium-1200x1200.jpg",
    "http://www.long-mcquade.com/files/18798/lg_Products846110-1200x1200-1375971.jpg",
    "https://sc1.musik-produktiv.com/pic-010103296_01xxl/tama-s-l-p-4-pcs-studio-maple-drumset.jpg",
    "https://cdn2.bigcommerce.com/server5900/gs0pdv/products/7463/images/10684/10_12_14_16_22__56597.1419025267.1280.1280.jpg?c=2",
    "https://www.long-mcquade.com/files/93818/lg_7ccb45079378bf43a8653cd4d7b6e0dc.jpg",
    "https://cdn.rekkerd.org/wp-content/uploads/2018/01/Alesis-Command-Mesh.jpg",
    "https://c1.zzounds.com/media/productmedia/fit,2018by3200/quality,85/FX725C_31-0d29b4a9ae2eee40833ec842825684e0.jpg",
    "https://www.long-mcquade.com/files/130732/lg_7050e0489908547886fed7752d0a3833.jpg",
    "https://www.explorersdrums.com/assets/images/vad506_4.jpg",
    "https://static.wixstatic.com/media/ac2700_50318f73853b4ab3b8dce574def939b1~mv2_d_2500_1818_s_2.png/v1/fit/w_2500,h_1330,al_c/ac2700_50318f73853b4ab3b8dce574def939b1~mv2_d_2500_1818_s_2.png",
    "https://fidockdrums.com/wp-content/uploads/2012/06/Beebop_kit_double_lug05_1200w.jpg",
]

const stringImages = [
 "https://www.walmart.com/ip/Green-Acoustic-Classic-Rock-N-Roll-6-Stringed-Guitar-Toy-Guitar-Musical-Instrument-for-Kids-Includes-Guitar-Pick-Extra-Guitar-String/285981811",
 "https://images-na.ssl-images-amazon.com/images/I/61y502lsv5L.__AC_SY300_QL70_ML2_.jpg",
 "https://images.amcnetworks.com/bbcamerica.com/wp-content/uploads/2013/04/hofner.jpg",
 "http://cdn.mos.musicradar.com/images/Total%20Guitar/240/inspired-instruments-you-rock-guitar-1200-80.jpg",
 "https://images.metmuseum.org/CRDImages/as/web-large/LC-MuddyWatersguitar.jpg",
 "https://images-na.ssl-images-amazon.com/images/I/41hTuOBDZRL._SY300_.jpg",
 "https://www.amazon.com/Daisy-Rock-Special-Velvet-Electric/dp/B001SASQ2A",
 "https://pixabay.com/en/electric-guitar-rock-guitar-1669233/",
 "https://www.walmart.com/ip/Gold-Classic-Rock-N-Roll-6-Stringed-Acoustic-Guitar-Toy-Guitar-Musical-Instrument-for-Kids-Includes-Guitar-Pick-Extra-Guitar-String/426828935",
 "http://www.engadget.com/2008/09/11/rock-band-2-standalone-instruments-set-to-ship-next-week/",
 "https://www.amazon.com/Daisy-Rock-WildWood-Artist-Acoustic-Electric/dp/B001SASQ0C",
 "https://www.wired.com/wp-content/uploads/images_blogs/gamelife/2010/10/mustang.png",
 "https://i.pinimg.com/originals/74/74/67/747467b691390ba54a1e4c666bd857ed.jpg",
 "https://i5.walmartimages.com/asr/373e21a0-9bc2-4055-bf94-081359a9e895_1.beb7523a03e8752e615b87a8c2fc04d6.jpeg",
]

const keysImages = [
    "https://i5.walmartimages.com/asr/5f88a0ea-c12b-4ee7-9a8e-fefa4ae1c574_1.426cd2722515044b88f2a017008eac5b.jpeg",
    "https://www.musikalessons.com/blog/wp-content/uploads/2017/06/grand-piano-.jpg",
    "https://i5.walmartimages.com/asr/82459887-b2b5-4f98-8869-4866dbdb96d4_1.8a9d79c8032fbd771261f09c0f3ba850.jpeg",
    "https://i5.walmartimages.com/asr/6475e39a-71da-4c6b-a576-10a7595da286_1.48f3af00628e4c31740edfcb793753a3.jpeg",
    "https://images-na.ssl-images-amazon.com/images/I/91CS0eGcsXL.jpg",
    "http://www.azpiano.com/unique-pianos/wp-content/uploads/2014/10/Kawai-RX-6.png",
    "https://tse4.mm.bing.net/th?id=OIP.nDGPH_vcENrIOKouBmALnQHaH6&pid=Api",
    "http://cdn.trendhunterstatic.com/thumbs/steinway-limited-edition-lilly-pulitzer-printed-model-m-piano.jpeg",
    "http://www.azpiano.com/unique-pianos/wp-content/uploads/2014/10/steinway-l-main.png",
    "http://www.blendingbeautiful.com/blog/wp-content/uploads/2011/04/afterpiano.jpg",
    "https://theuntoldwant.files.wordpress.com/2010/05/529096313_ef51694dc6.jpg",
    "https://i.pinimg.com/originals/c3/02/cd/c302cd6db9b61592cc0f87e759b64ca6.jpg",
    "https://www.rct.uk/sites/default/files/148348-1297437710.jpg",
]

const otherImages = [
    "https://tse3.mm.bing.net/th?id=OIP.5bJTXQtCjXqjAgt9b0sk8AHaHa&pid=Api",
    "https://ae01.alicdn.com/kf/HTB12xftNgHqK1RjSZFPq6AwapXaB/Seatbelt-ClipLock-Guitar-Straps-with-Clip-Lock-Leather-End-5cm-Width-90-160cm-Length-for-Acoustic.jpg",
    "https://tse1.mm.bing.net/th?id=OIP.IkeuEz1sCq8XMr7QTRsNtgHaH1&pid=Api",
    "https://tse2.mm.bing.net/th?id=OIP.XwnCEuhob_IgYfOp5bNV5gHaIr&pid=Api",
    "https://tse1.mm.bing.net/th?id=OIP.1HHxAWitZOMxFCwFaiVx3AHaHa&pid=Api",
    "https://tse1.mm.bing.net/th?id=OIP.cDuNbD_MlJWHrteiZ_Y1ggHaHa&pid=Api",
    "https://www.fullcompass.com/common/products/original/296732.jpg",
    "https://tse2.mm.bing.net/th?id=OIP.V-9cNiJFJVyigYgBH-BlhwHaHa&pid=Api",
    "http://www.jimlaabsmusic.com/images/uploads/drumsets/drumsticks/trixon/trixonDrumSticks_7Awood.jpg",
    "https://media.musiciansfriend.com/is/image/MMGS7/H76008000002001-00-1000x1000.jpg",
    "https://tse2.mm.bing.net/th?id=OIP.bgagOZmhy1xaDov8-6O-TgHaFa&pid=Api",
    "https://tse3.mm.bing.net/th?id=OIP.jTmDCLhI7HA2XRQTzyX8dwHaFE&pid=Api",
    "https://www.swamp.net.au/assets/full/12404.jpg",
]

const loremipsum = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Suspendisse interdum consectetur libero id. Lacus sed viverra tellus in hac habitasse platea dictumst. Mattis vulputate enim nulla aliquet porttitor lacus. Sagittis aliquam malesuada bibendum arcu vitae elementum. ",
    "Fringilla phasellus faucibus scelerisque eleifend. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Sagittis purus sit amet volutpat. Sodales ut eu sem integer vitae justo eget magna.",
    "Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Sapien faucibus et molestie ac feugiat sed.",
]

function populateProducts(num)  {
    const products = [];
    const types = [ 'accessories', 'percussion', 'keys', 'string' ];

    for(let i=0; i<num; i++)    {
        let rand = Math.floor(Math.random(0, 4));
        let type = types[rand];
        let image = '';
        let name = '';

        switch(type) {
            case 'accessories':
                image = otherImages[Math.floor(Math.random(0, otherImages.length-1))];
                name = "Accessory Product";
                break
            case 'percussion':
                image = drumsImages[Math.floor(Math.random(0, drumsImages.length-1))];
                name = "Drumkit Product"
                break
            case 'keys':
                image = keysImages[Math.floor(Math.random(0, keysImages.length-1))];
                name = "Keyboard/Piano Product"
                break
            case 'string':
                image = stringImages[Math.floor(Math.random(0, stringImages.length-1))];
                name = "String Instrument Product"
                break
            default:
                console.log('Error occurred populating a name or image.');
        }

        let instance = {
            // id will autopopulate upon seeding
            code: UUID(),
            name: name,
            type: type,
            quantity: Math.floor(Math.random(1, 15)),
            description: loremipsum[rand],
            price: Math.random(0, 1200),
            // createdAt timestamp will autopopulate upon seeding
        }

        products.push(instance);
    }
    return products; //should be array
}

const products = populateProducts(100);


const seed = async () => {
    try {
        await db.sync( { force: true } );

        await Promise.all(users.map(user => {
            return Users.create(user);
        }));

        await Promise.all(products.map(product => {
            return Products.create(product);
        }));

    } catch (err) {
        console.log(err);
    }
};

module.exports = seed;

// feedback in console:
if (require.main === module) {
    seed()
      .then(() => {
        console.log(green('Seeding success!'));
        db.close();
      })
      .catch((err) => {
        console.error(red('Uh oh! Something went wrong!'));
        console.error(err);
        db.close();
      });
  };