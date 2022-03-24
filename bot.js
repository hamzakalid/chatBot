// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, ActivityTypes, ActionTypes, CardFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const menu = [
                {
                    name: '*Pizza*',
                    price: '$10',
                    description: 'Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.',
                    image: 'https://api.lorem.space/image/pizza?w=800&h=400&hash=6kd07s7s'
                },
                {
                    name: '*Burger*',
                    price: '$5',
                    description: 'A hamburger is a type of sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
                    image: 'https://api.lorem.space/image/burger?w=800&h=400&hash=95bubvgl'
                },
                {
                    name: '*Sandwich*',
                    price: '$3',
                    description: 'A sandwich is a type of food typically consisting of vegetables, sliced cheese, and sometimes meat, such as beef, chicken, or fish, and often supplemented with condiments such as mayonnaise or ketchup.',
                    image: 'https://api.lorem.space/image/burger?w=800&h=400&hash=qkhzb2j3'
                },
                {
                    name: '*Cake*',
                    price: '$2',
                    description: 'A cake is a sweet dish that may be served hot or cold, which may be composed of leavened batter or batter mixed with other ingredients, such as eggs, milk, butter, and fruit, and decorated with icing and fruit.',
                    image: 'https://api.lorem.space/image/pizza?w=800&h=400&hash=30tzweg2'
                },
                {
                    name: '*Coffee*',
                    price: '$1',
                    description: 'A coffee is a brewed drink prepared from roasted coffee beans, which are the seeds of berries from the Coffea plant. Coffee is traditionally prepared by pouring hot water over a coffee mill or by heating and then separating the liquid and the grounds.',
                    image: 'https://api.lorem.space/image/drink?w=800&h=400&hash=9eh4vpy4'
                },
                {
                    name: '*Tea*',
                    price: '$1',
                    description: 'A tea (also called green tea, black tea, oolong tea, and loose leaf tea) is a type of beverage prepared from Camellia sinensis leaves, the leaves of a tea plant, especially the African variety, grown for their leafy green leaves and their leaves containing multiple aromatic compounds, which when steeped in hot water, yield a beverage that has a stimulating effect on the liver.',
                    image: 'https://api.lorem.space/image/drink?w=800&h=400&hash=5z4jagvb'
                },
                {
                    name: '*Juice*',
                    price: '$1',
                    description: 'A juice is a drink made from the extract (or juice) of fruits and vegetables. Juice is typically concentrated, but it is also possible to make juice from the seeds, stems, or pods of certain plants. Juice is typically made from the dried (or pickled) form of these plants, but dried fruits and vegetables are also common.',
                    image: 'https://api.lorem.space/image/drink?w=800&h=400&hash=e5do6n0z'
                },
                {
                    name: '*Milk*',
                    price: '$1',
                    description: 'Milk is a white liquid produced by the mammary glands of mammals. It is the primary source of nutrition for infant mammals, and is the second most important food for humans after meat and dairy products. It is produced from the milk glands of mammals, primarily cows.',
                    image: 'https://api.lorem.space/image/drink?w=800&h=400&hash=dtouq132'
                },
                {
                    name: '*Water*',
                    price: '$1',
                    description: 'Water is a clear, tasteless, odorless, tasteless, non-dissolving, colorless, highly viscous fluid. It is the main constituent of Earth\'s atmosphere, and the most widely abundant element in nature. Water is the most abundant element in the universe, with approximately seven-eightths of the universe\'s volume being occupied by liquid water.',
                    image: 'https://api.lorem.space/image/drink?w=800&h=400&hash=9mh9xsdk'
                }
            ];

            if (context.activity.text === 'hi') {
                await context.sendActivity('Hi there!');
            } else if (context.activity.text === 'menu') {
                // display list of cards with data
                const reply = MessageFactory.carousel(menu.map(item => {
                    // card image
                    const image = CardFactory.images([{ url: item.image }]);
                    // card actions
                    const actions = CardFactory.actions([
                        {
                            type: ActionTypes.MessageBack,
                            title: 'Add to cart',
                            text: item.name,
                            displayText: item.name,
                            value: item.name
                        }
                    ]);
                    // card content
                    const card = CardFactory.heroCard(`${ item.name } - ${ item.price }`, item.description, image, actions);
                    // return card
                    return card;
                }));
                // Send Actibity___________________}
                await context.sendActivity(reply);
            } else if (context.activity.text === 'card') {
                // Display Card with image and actions
                const reply = MessageFactory.attachment(CardFactory.heroCard(
                    'Hero Card',
                    'This is a Hero Card',
                    CardFactory.images([{ url: 'http://via.placeholder.com/500x300' }]),
                    CardFactory.actions([
                        {
                            type: ActionTypes.MessageBack,
                            title: 'Add to cart',
                            text: 'Add to cart',
                            displayText: 'Add to cart',
                            value: 'Add to cart'
                        },
                        {
                            type: ActionTypes.MessageBack,
                            title: 'Add to cart',
                            text: 'Add to cart',
                            displayText: 'Add to cart',
                            value: 'Add to cart'
                        }
                    ])));
                // Send Actibity___________________
                await context.sendActivity(reply);
            } else if (context.activity.text === 'help') {
                await context.sendActivity('You can say hi, menu or help');
            }
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
