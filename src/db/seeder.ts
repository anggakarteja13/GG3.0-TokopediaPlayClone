import User from '../models/User';
import { ObjectId } from 'mongodb';
import Video from '../models/Video';
import Product from '../models/Product';
import { hashingPassword } from '../utils/functions';
import DB from '.';

const userSeeds = [
    {
        _id: new ObjectId().toString(),
        userName: 'User 1',
        role: 'user',
        email: 'user1@gmail.com',
        password: async() => { return await hashingPassword('user111')},
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-avatar&psig=AOvVaw1D7Srgu1dUainfJUv9ceJb&ust=1690581396647000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCPjFts_wr4ADFQAAAAAdAAAAABAE',
    },
    {
        _id: new ObjectId().toString(),
        userName: 'Merchant 1',
        role: 'merchant',
        email: 'merchant1@gmail.com',
        password: async() => { return await hashingPassword('merchant111')},
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-avatar&psig=AOvVaw1D7Srgu1dUainfJUv9ceJb&ust=1690581396647000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCPjFts_wr4ADFQAAAAAdAAAAABAE',
    },
];

const videoSeeds = [
    {
        _id: new ObjectId().toString(),
        userId: userSeeds[1]._id,
        thumbnailUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.businessinsider.com%2Fguides%2Ftech%2Fkeychron-k1-se-wireless-mechanical-keyboard-review&psig=AOvVaw1a_GBElUAAG8nsQ9vuTRWZ&ust=1690582015531000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwj376H18q-AAxWJj2MGHQlrAEAQjRx6BAgAEAw',
        videoUrl: 'https://www.youtube.com/watch?v=mqtK-E-1wok',
        title: 'Jualan keyboard GANNNNN',
    },
    {
        _id: new ObjectId().toString(),
        userId: userSeeds[1]._id,
        thumbnailUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hongsengmusic.com%2Fproduct%2F1781%2F&psig=AOvVaw0aaabnrSho4HXnK2_GVoQR&ust=1690581941101000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCOjp8tLyr4ADFQAAAAAdAAAAABAE',
        videoUrl: 'https://www.youtube.com/watch?v=vVBRYYfQFMk&ab_channel=IbanezGuitar',
        title: 'Yook yg gitar merapat',
    }
];

const productSeeds = [
    {
        _id: new ObjectId().toString(),
        videoId: videoSeeds[0]._id,
        userId: userSeeds[1]._id,
        productUrl: 'https://www.tokopedia.com/keychron/keychron-k1-se-ultra-slim-tkl-white-backlight-optical-hot-swappable-red-switch',
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.businessinsider.com%2Fguides%2Ftech%2Fkeychron-k1-se-wireless-mechanical-keyboard-review&psig=AOvVaw1a_GBElUAAG8nsQ9vuTRWZ&ust=1690582015531000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwj376H18q-AAxWJj2MGHQlrAEAQjRx6BAgAEAw',
        title: 'Keyboard Keychron K1 SE',
        price: 1500000,
    },
    {
        _id: new ObjectId().toString(),
        videoId: videoSeeds[0]._id,
        userId: userSeeds[1]._id,
        productUrl: 'https://www.tokopedia.com/ciptakarsaid/hot-deals-ibanez-rg-premium-rg1070pbz-charcoal-black-burst',
        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hongsengmusic.com%2Fproduct%2F1781%2F&psig=AOvVaw0aaabnrSho4HXnK2_GVoQR&ust=1690581941101000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCOjp8tLyr4ADFQAAAAAdAAAAABAE',
        title: 'Ibanez Premium RG1070PBZ',
        price: 23000000,
    }
]

async function seed() {
    try {
        await DB.startConnection();
        await Promise.all([User.deleteMany(), Video.deleteMany(), Product.deleteMany()]);
        await User.create(userSeeds);
        await Video.create(videoSeeds);
        await Product.create(productSeeds);
        console.log('Seeding complete');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
seed();
