import DB from '.';
import User from '../models/User';
import Video from '../models/Video';
import Product from '../models/Product';
import { hashingPassword } from '../utils/functions';

const userSeeds = [
    {
        userName: 'User 1',
        role: 'user',
        email: 'user1@gmail.com',
        password: 'user111',
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-avatar&psig=AOvVaw1D7Srgu1dUainfJUv9ceJb&ust=1690581396647000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCPjFts_wr4ADFQAAAAAdAAAAABAE',
    },
    {
        userName: 'Merchant 1',
        role: 'merchant',
        email: 'merchant1@gmail.com',
        password: 'merchant111',
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-avatar&psig=AOvVaw1D7Srgu1dUainfJUv9ceJb&ust=1690581396647000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCPjFts_wr4ADFQAAAAAdAAAAABAE',
    },
];

const videoSeeds = [
    {
        userId: null,
        thumbnailUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.businessinsider.com%2Fguides%2Ftech%2Fkeychron-k1-se-wireless-mechanical-keyboard-review&psig=AOvVaw1a_GBElUAAG8nsQ9vuTRWZ&ust=1690582015531000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwj376H18q-AAxWJj2MGHQlrAEAQjRx6BAgAEAw',
        videoUrl: 'https://www.youtube.com/watch?v=mqtK-E-1wok',
        title: 'Jualan keyboard GANNNNN',
    },
    {
        userId: null,
        thumbnailUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hongsengmusic.com%2Fproduct%2F1781%2F&psig=AOvVaw0aaabnrSho4HXnK2_GVoQR&ust=1690581941101000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCOjp8tLyr4ADFQAAAAAdAAAAABAE',
        videoUrl: 'https://www.youtube.com/watch?v=vVBRYYfQFMk&ab_channel=IbanezGuitar',
        title: 'Yook yg gitar merapat',
    }
];

const productSeeds = [
    {
        videoId: null,
        userId: null,
        productUrl: 'https://www.tokopedia.com/keychron/keychron-k1-se-ultra-slim-tkl-white-backlight-optical-hot-swappable-red-switch',
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.businessinsider.com%2Fguides%2Ftech%2Fkeychron-k1-se-wireless-mechanical-keyboard-review&psig=AOvVaw1a_GBElUAAG8nsQ9vuTRWZ&ust=1690582015531000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwj376H18q-AAxWJj2MGHQlrAEAQjRx6BAgAEAw',
        title: 'Keyboard Keychron K1 SE',
        price: 1500000,
    },
    {
        videoId: null,
        userId: null,
        productUrl: 'https://www.tokopedia.com/ciptakarsaid/hot-deals-ibanez-rg-premium-rg1070pbz-charcoal-black-burst',
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hongsengmusic.com%2Fproduct%2F1781%2F&psig=AOvVaw0aaabnrSho4HXnK2_GVoQR&ust=1690581941101000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCOjp8tLyr4ADFQAAAAAdAAAAABAE',
        title: 'Ibanez Premium RG1070PBZ',
        price: 23000000,
    }
]

async function seed() {
    try {
        await DB.startConnection();
        const [pass1, pass2] = await Promise.all([
            hashingPassword(userSeeds[0].password),
            hashingPassword(userSeeds[1].password)
        ]);
        userSeeds[0].password = pass1;
        userSeeds[1].password = pass2;
        await Promise.all([User.deleteMany(), Video.deleteMany(), Product.deleteMany()]);
        const [ user1, user2 ] = await User.insertMany(userSeeds);
        videoSeeds[0].userId = user2.id;
        videoSeeds[1].userId = user2.id;
        const [ video1, video2 ] = await Video.insertMany(videoSeeds);
        productSeeds[0].userId = user2.id;
        productSeeds[0].videoId = video1.id;
        productSeeds[1].userId = user2.id;
        productSeeds[1].videoId = video2.id;
        await Product.insertMany(productSeeds);
        await DB.conn.close();
        console.log('   Seeding complete');
        process.exit(0);
    } catch (error) {
        await DB.conn.close();
        console.error(error);
        process.exit(1);
    }
}
seed();
