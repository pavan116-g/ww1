import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Import the original basic data for safety, but we will mostly use dense Data
// Wait, actually I will just combine the best data here.

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const denseWesternBattles = [
    {
        name: "Battle of the Frontiers",
        date: "Aug 1914",
        dateRange: "7 Aug 1914 → 6 Sep 1914",
        victor: "German Decisive Victory",
        note: "A series of massive, chaotic meeting engagements between the French, British, and German armies during the opening weeks of the war. It was defined by the disastrous French 'Plan XVII' which called for frontal assaults by infantry in bright red trousers.",
        facts: [
            "The single bloodiest day in French military history occurred on August 22, 1914, when 27,000 French soldiers died in a single day.",
            "The French army wore essentially the exact same brightly colored uniforms they had worn in the 1870 Franco-Prussian war.",
            "The German army was executing the 'Schlieffen Plan', a massive sweeping right hook through neutral Belgium.",
            "The small, highly professional British Expeditionary Force (BEF) clashed with the German First Army at Mons. The British rifle fire was so rapid the Germans believed they were facing massed machine guns."
        ],
        result: [
            "The French and British armies were forced into a chaotic, near-disastrous 14-day fighting retreat known as the 'Great Retreat'.",
            "Combined casualties for all sides in the first month of the war exceeded 1,000,000.",
            "The utter failure of traditional 19th-century infantry tactics forced the rapid adoption of trench warfare and steel helmets."
        ],
        img: "/Mons.jpg",
        front: "western"
    },
    {
        name: "First Battle of the Marne",
        date: "Sep 1914",
        dateRange: "6 Sep 1914 → 12 Sep 1914",
        victor: "Strategic Allied Victory",
        note: "The 'Miracle of the Marne' where the retreating French and British armies dramatically turned and counter-attacked the exhausted German army just 30 miles from Paris, permanently halting the Schlieffen Plan.",
        facts: [
            "As the German First Army swung southeast to encircle the retreating French, they exposed their right flank.",
            "In one of the most famous legends of the war, 600 Parisian 'Renault Type AG' taxi cabs were commandeered to rush 6,000 French reserve infantrymen to the front lines.",
            "German forward units had completely outrun their supply lines, marching over 20 miles a day for a month.",
            "The unexpected gap between the German armies was exploited by the BEF, forcing a general retreat."
        ],
        result: [
            "Germany's overarching strategic goal—to win a swift, decisive victory in the West—completely failed.",
            "The German army retreated to high ground along the River Aisne and began digging the first permanent trench networks.",
            "This directly initiated the 'Race to the Sea', resulting in a continuous line from the Alps to the Channel."
        ],
        img: "/Marne1.jpg",
        front: "western"
    },
    {
        name: "First Battle of Ypres",
        date: "Oct–Nov 1914",
        dateRange: "19 Oct 1914 → 22 Nov 1914",
        victor: "Stalemate / Allied Defensive Victory",
        note: "The desperate culmination of the 'Race to the Sea' where the remnants of the British regular army successfully held the vital Belgian town of Ypres, effectively destroying the pre-war British professional army in the process.",
        facts: [
            "Known in Germany as the 'Massacre of the Innocents of Langemarck' due to the slaughter of young student volunteers.",
            "British troops were spread so thin that cooks, clerks, and grooms were given rifles to plug gaps in the line.",
            "Hand-to-hand combat with bayonets and entrenching tools took place in near-freezing rain and mud.",
            "This battle marked the final end of mobile warfare on the Western Front."
        ],
        result: [
            "The British Expeditionary Force suffered 58,000 casualties, virtually wiping out the highly trained professional army.",
            "The Ypres Salient was formed, making it one of the deadliest sectors of the entire war.",
            "Britain was forced to rely heavily on Lord Kitchener's 'New Army' of civilian volunteers."
        ],
        img: "/Ypres1.jpg",
        front: "western"
    },
    {
        name: "Second Battle of Ypres",
        date: "Apr–May 1915",
        dateRange: "22 Apr 1915 → 25 May 1915",
        victor: "German Tactical Victory",
        note: "The battle that forever changed the nature of modern warfare, marking the first successful mass use of lethal chemical weapons (Chlorine gas) by the German army.",
        facts: [
            "At 5:00 PM on April 22, the Germans released 168 tons of chlorine gas from 5,730 hidden cylinders.",
            "The horrific effects caused a massive, chaotic panic, opening a devastating 4-mile wide gap in the Allied lines.",
            "The gap was heroically plugged by the 1st Canadian Division, who urinated on handkerchiefs to survive the gas.",
            "The famous poem 'In Flanders Fields' was written during this battle by Canadian physician Lieutenant Colonel John McCrae."
        ],
        result: [
            "Chemical warfare became a terrifying, permanent fixture of the conflict.",
            "The Allied lines around Ypres were permanently compressed closer to the town.",
            "The staggering Canadian casualties began forging a distinct Canadian national military identity."
        ],
        img: "/Ypres2.jpg",
        front: "western"
    },
    {
        name: "Battle of Verdun",
        date: "Feb–Dec 1916",
        dateRange: "21 Feb 1916 → 18 Dec 1916",
        victor: "French Defensive Victory",
        note: "The longest, arguably most horrific battle in human history. Launched not to capture territory, but specifically to 'bleed France white' by forcing them to defend a symbolically vital fortress city to the death.",
        facts: [
            "The opening German bombardment fired over 1 million artillery shells in just 10 hours. Up to 60 million shells were fired in total.",
            "Over 70% of the entire French army eventually served a tour in the 'Meat Grinder' of Verdun.",
            "The vital supply artery, 'La Voie Sacrée' (The Sacred Way), saw over 3,000 trucks pass every single day under constant fire.",
            "Fort Douaumont was humiliatingly captured without a shot fired in the opening days because the French had removed its garrison."
        ],
        result: [
            "Estimated combined casualties range from 700,000 to nearly 1 million men.",
            "The rallying cry 'Ils ne passeront pas!' (They shall not pass!) became a symbol of French national resistance.",
            "The sheer scale of the slaughter directly contributed to the widespread mutinies of the French army the following year."
        ],
        img: "/Verdun.jpg",
        front: "western"
    },
    {
        name: "Battle of the Somme",
        date: "Jul–Nov 1916",
        dateRange: "1 Jul 1916 → 18 Nov 1916",
        victor: "Stalemate / Inconclusive",
        note: "A massive joint British and French offensive. The first day of the battle remains the blackest day in the history of the British Army.",
        facts: [
            "The British fired an unprecedented 1.5 million artillery shells over 7 days, but over 30% were duds.",
            "On July 1st, tens of thousands of British soldiers went 'over the top' and were slaughtered. Britain suffered 57,470 casualties on the first morning.",
            "Many destroyed units were 'Pals Battalions'—men from the same town or factory who had enlisted together.",
            "The battle marked the very first use of tanks in warfare, though they were slow and mechanically unreliable."
        ],
        result: [
            "Over 1,000,000 men were killed or wounded in 141 days for an advance of exactly 6 miles.",
            "The constant, grinding pressure inflicted devastating losses on the experienced core of the German army.",
            "The realities of industrial war irreversibly shattered the romanticized view of military glory in Britain."
        ],
        img: "/Somme.jpg",
        front: "western"
    },
    {
        name: "Battle of Vimy Ridge",
        date: "Apr 1917",
        dateRange: "9 Apr 1917 → 12 Apr 1917",
        victor: "Canadian/Allied Victory",
        note: "A meticulously planned assault where all four divisions of the Canadian Corps captured a heavily fortified ridge that had previously defied both British and French armies.",
        facts: [
            "The attack used 'sound ranging' and 'flash spotting' to map and destroy 83% of all German artillery.",
            "Troops rehearsed the assault on full-scale models. Every soldier was given a map and knew his objective.",
            "The infantry advanced directly behind a 'creeping barrage'—a perfectly timed, rolling wall of explosive artillery fire.",
            "Engineers dug massive subterranean tunnels through the chalk, allowing staging brigades to arrive completely unseen."
        ],
        result: [
            "A stunning tactical success: the ridge was entirely captured within three days.",
            "The victory became a profound, foundational moment for Canadian national identity.",
            "The tactical innovations became the standard blueprint for all successful Allied offensives."
        ],
        img: "/Vimy.jpg",
        front: "western"
    },
    {
        name: "Passchendaele (Third Ypres)",
        date: "Jul–Nov 1917",
        dateRange: "31 Jul 1917 → 10 Nov 1917",
        victor: "Stalemate",
        note: "Fought in the worst weather in a generation, the battlefield became an apocalyptic swamp of liquid mud where men, horses, and tanks literally drowned.",
        facts: [
            "A 4.2 million shell bombardment destroyed the delicate drainage systems of Flanders, turning the battlefield into a sea of mud.",
            "Because trenches could not be dug in the liquid mud, the Germans constructed interlocking concrete 'pillboxes'.",
            "If a soldier slipped off the wooden duckboards, the suction of the mud was so tremendous they often could not be pulled out.",
            "The Canadian Corps was ordered on a suicide mission to capture the ruined village, taking 16,000 casualties."
        ],
        result: [
            "Over 500,000 combined casualties for an advance of exactly 5 miles.",
            "The extreme futility permanently damaged the reputation of British Commander-in-Chief Sir Douglas Haig.",
            "The horror of the mud cemented Passchendaele alongside the Somme as a defining tragedy of WWI."
        ],
        img: "/Passchendaele.jpg",
        front: "western"
    },
    {
        name: "Spring Offensive",
        date: "Mar–Jul 1918",
        dateRange: "21 Mar 1918 → 18 Jul 1918",
        victor: "Initial German Success / Ultimate Allied Victory",
        note: "Germany's massive, desperate gamble to break the trench stalemate utilizing specialized stormtroopers before millions of fresh American troops could arrive.",
        facts: [
            "With Russia knocked out, Germany transferred 50 veteran divisions to the West.",
            "The Germans used short, hurricane bombardments mixing gas and high explosives to blind defenders.",
            "Stormtroopers armed with flamethrowers and submachine guns infiltrated deep into the British rear in the fog.",
            "The offensive initially captured more ground in a week than the Allies had taken in three years."
        ],
        result: [
            "The German troops lost crucial momentum when they stopped to loot British supply depots filled with food and wine.",
            "Having lost 680,000 of their absolute best assault troops, the German army was functionally exhausted.",
            "The crisis forced the Allies to appoint a single supreme commander, French General Ferdinand Foch."
        ],
        img: "/SpringOffensive.jpg",
        front: "western"
    },
    {
        name: "Hundred Days Offensive",
        date: "Aug–Nov 1918",
        dateRange: "8 Aug 1918 → 11 Nov 1918",
        victor: "Decisive Allied Win",
        note: "The brilliant, fast-paced Allied counter-offensive. Combining infantry, tanks, aircraft, and creeping barrages, it forced the collapse of the German Empire.",
        facts: [
            "The opening battle at Amiens was described by German General Erich Ludendorff as 'The Black Day of the German Army'.",
            "The Allies adopted a strategy of hitting hard, then immediately shifting the attack to a different sector to keep Germans off balance.",
            "1.2 million fresh American troops overwhelmed the shattered German lines in the Meuse-Argonne offensive.",
            "British, Australian, and Canadian forces methodically dismantled the massive bunker networks of the 'Hindenburg Line'."
        ],
        result: [
            "The relentless pressure collapsed Germany and its allies: Bulgaria, the Ottoman Empire, and Austria-Hungary surrendered.",
            "A naval mutiny in Kiel triggered a revolution. Kaiser Wilhelm II abdicated.",
            "The German High Command signed the Armistice in a railway carriage on the 11th of November, 1918."
        ],
        img: "/HundredDays.jpg",
        front: "western"
    }
];

const denseEasternBattles = [
    {
        name: "Battle of Tannenberg",
        date: "Aug 1914",
        dateRange: "26 Aug 1914 → 30 Aug 1914",
        victor: "Decisive German Win",
        note: "A spectacular encirclement victory. A heavily outnumbered German force intercepted unencrypted Russian radio broadcasts, completely annihilating the invading Russian Second Army.",
        facts: [
            "The Russian army mobilized surprisingly fast into East Prussia, but lacked basic logistics, shells, and rifles.",
            "The Russians broadcast their daily marching orders 'in the clear' without radio encryption.",
            "The commanders of the two Russian armies deeply despised each other and refused to coordinate.",
            "Hindenburg and Ludendorff shuttled troops by train to trap Samsonov's Second Army in the forests."
        ],
        result: [
            "Over 92,000 Russian soldiers were captured and over 70,000 killed or wounded, compared to just 12,000 German casualties.",
            "General Samsonov walked alone into the forest at night and shot himself in the head.",
            "The victory elevated Hindenburg and Ludendorff to near-mythological dictatorial status in Germany."
        ],
        img: "/Tannenberg.jpg",
        front: "eastern"
    },
    {
        name: "First Masurian Lakes",
        date: "Sep 1914",
        dateRange: "7 Sep 1914 → 14 Sep 1914",
        victor: "German Victory",
        note: "The immediate follow-up to Tannenberg. The German Eighth Army outflanked the remaining Russian First Army, entirely evicting Russian forces from German territory.",
        facts: [
            "The Russian First Army under Rennenkampf had remained entirely stationary during Tannenberg, doing nothing to help.",
            "The Germans utilized their home terrain of lakes, swamps, and dense forests to outmaneuver the Russians.",
            "Despite severe pressure, the Russian army managed to execute a somewhat orderly fighting retreat.",
            "Hindenburg cemented his legendary reputation as the 'Savior of East Prussia'."
        ],
        result: [
            "Russia was definitively expelled from German soil for the rest of the war.",
            "The Russian army lost another 125,000 men and 150 vital artillery pieces.",
            "The troops Germany had diverted east to defend Prussia likely cost them the Battle of the Marne in the West."
        ],
        img: "/Masurian.jpg",
        front: "eastern"
    },
    {
        name: "Battle of Galicia",
        date: "Aug–Sep 1914",
        dateRange: "23 Aug 1914 → 11 Sep 1914",
        victor: "Decisive Russian Win",
        note: "While losing in the north, Russia inflicted an absolutely catastrophic defeat upon the Austro-Hungarian Empire in the south, destroying a third of their Army in mere weeks.",
        facts: [
            "Austro-Hungarian commanders severely underestimated the incredible speed of the Russian mobilization.",
            "The Austro-Hungarian army was composed of 11 different ethnic groups. Many Slavic troops had no desire to fight their Russian 'brothers' and surrendered en masse.",
            "The feared Russian Cossack cavalry ran wild behind the shattered Austro-Hungarian lines.",
            "The Russians captured the provincial capital of Lemberg (modern Lviv) and advanced to the Carpathian Mountains."
        ],
        result: [
            "Austria-Hungary suffered over 400,000 casualties and lost a devastating amount of their professional officer corps.",
            "Germany was forced to constantly divert armies south to prop up their rapidly collapsing allies.",
            "The victory proved the Russian Imperial Army was highly capable of massive operational success."
        ],
        img: "/Galicia.jpg",
        front: "eastern"
    },
    {
        name: "Gorlice–Tarnów Offensive",
        date: "May–Jun 1915",
        dateRange: "2 May 1915 → 22 Jun 1915",
        victor: "Strategic German/Austrian Win",
        note: "A spectacular joint offensive that completely shattered the Russian front lines. The massive artillery superiority of the Germans caused a 'Great Retreat' of the entire Russian army.",
        facts: [
            "The German commander amassed a terrifying concentration of heavy artillery: roughly one heavy gun every 40 yards.",
            "The Russian army was experiencing a crippling 'shell crisis', limited to firing 3 shells per day.",
            "Russian infantry were sent to the front without rifles, ordered to pick up weapons from their dead comrades.",
            "For millions of Russian soldiers, the next months were a starving, chaotic foot-retreat eastward."
        ],
        result: [
            "The Central Powers recaptured Galicia, Warsaw, and drove the Russians out of Poland, advancing over 300 miles east.",
            "The Russian army suffered up to 2 million casualties (mostly prisoners) during the Great Retreat.",
            "Tsar Nicholas II disastrously took personal, direct control of the armed forces at the front, tying the throne to future defeats."
        ],
        img: "/Gorlice.jpg",
        front: "eastern"
    },
    {
        name: "Brusilov Offensive",
        date: "Jun–Sep 1916",
        dateRange: "4 Jun 1916 → 20 Sep 1916",
        victor: "Decisive Russian Win",
        note: "Russia's greatest feat of arms. Utilizing completely revolutionary new tactics, General Brusilov utterly shattered the Austro-Hungarian lines, bringing the empire to the brink of collapse.",
        facts: [
            "Brusilov attacked simultaneously across an incredibly wide 300-mile front, preventing Austrians from knowing where to send reserves.",
            "Instead of days of bombardment, Russian artillery fired short, intense bursts immediately followed by fast-moving 'shock troops'.",
            "Russian sappers dug massive underground tunnels to within 50 yards of the Austrian lines.",
            "Entire Austrian regiments, particularly Czech and Slovak units who hated the empire, surrendered en masse."
        ],
        result: [
            "Austria-Hungary suffered over 1 million casualties and lost the ability to field an independent army.",
            "Germany had to halt their massive assault on Verdun in the West and rush troops east to prevent total collapse.",
            "Despite the success, the Russian army still suffered over 1 million casualties, pushing their society to the breaking point."
        ],
        img: "/Brusilov.jpg",
        front: "eastern"
    },
    {
        name: "The Kerensky Offensive",
        date: "Jul 1917",
        dateRange: "1 Jul 1917 → 19 Jul 1917",
        victor: "Central Powers Victory",
        note: "The disastrous final gasp of the Russian military. Ordered by the Provisional Government following the February Revolution, the mutinous Russian army attacked and immediately collapsed.",
        facts: [
            "The new Provisional Government disastrously decided to stay in the war despite massive civilian starvation.",
            "The army was completely demoralized. 'Soldier Committees' held votes on whether or not to obey officer orders.",
            "Entire divisions simply refused to fight, dropped their weapons, and began walking home.",
            "'Women's Battalions of Death' were formed to shame the male soldiers into fighting, but failed."
        ],
        result: [
            "The Russian army ceased to exist as a functional fighting force. Millions of peasant soldiers deserted.",
            "The catastrophic failure destroyed all remaining civilian support for the government, paving the way for the Bolshevik October Revolution.",
            "Russia was forced to sign the devastating Treaty of Brest-Litovsk, ceding massive territories to Germany."
        ],
        img: "/Kerensky.jpg",
        front: "eastern"
    }
];

const newBattles = [
    {
        name: "Gallipoli Campaign",
        date: "1915–1916",
        dateRange: "17 Feb 1915 → 9 Jan 1916",
        victor: "Ottoman Empire",
        note: "A disastrous Allied attempt to knock the Ottoman Empire out of the war and open a sea route to Russia.",
        facts: [
            "Initially a purely naval operation to force the Dardanelles straits, championed by Winston Churchill.",
            "After naval failure, Allied troops (including ANZAC forces) landed on the Gallipoli peninsula.",
            "Troops faced fierce Ottoman resistance led by Mustafa Kemal (later Atatürk).",
            "Ended in an evacuation after 8 months of trench stalemate and disease."
        ],
        result: [
            "Allies suffered ~250,000 casualties; Ottomans suffered similar losses.",
            "A defining moment of national identity for Australia and New Zealand (ANZAC Day).",
            "Winston Churchill resigned in disgrace and went to fight on the Western Front."
        ],
        img: "/Gallipoli.png",
        front: "middle-east"
    },
    {
        name: "Battle of Jutland",
        date: "May–Jun 1916",
        dateRange: "31 May 1916 → 1 Jun 1916",
        victor: "Stalemate / British Strategic",
        note: "The largest naval battle of World War I, involving 250 ships and 100,000 men.",
        facts: [
            "Fought between the British Grand Fleet and the German High Seas Fleet in the North Sea.",
            "Germany aimed to lure out and destroy a portion of the British fleet to break the blockade.",
            "The British lost more ships (14) and men (6,000) than Germany (11 ships, 2,500 men).",
            "Despite tactical losses, the British fleet remained intact and controlled the sea."
        ],
        result: [
            "The German High Seas Fleet rarely went to sea again in force for the rest of the war.",
            "The British naval blockade remained in place, slowly starving the German war economy.",
            "Germany shifted its strategy entirely to unrestricted submarine warfare."
        ],
        img: "/Jutland.png",
        front: "naval"
    },
    {
        name: "Battle of Caporetto",
        date: "Oct–Nov 1917",
        dateRange: "24 Oct 1917 → 19 Nov 1917",
        victor: "Central Powers",
        note: "A catastrophic Italian defeat where Austro-Hungarian and German forces advanced 100km.",
        facts: [
            "Germany sent troops and used new stormtrooper tactics and poison gas to break the Italian lines.",
            "The Italian Second Army completely collapsed, falling back in a chaotic retreat.",
            "A young Erwin Rommel highly distinguished himself executing infiltration tactics.",
            "Italian forces finally halted the advance at the Piave River."
        ],
        result: [
            "Over 300,000 Italian casualties, with ~265,000 taken prisoner.",
            "Sparked a political crisis in Italy, leading to the replacement of the military command.",
            "Britain and France had to rush divisions to Italy to prevent total collapse."
        ],
        img: "/Caporetto.png",
        front: "italian"
    },
    {
        name: "Battles of the Isonzo",
        date: "1915–1917",
        dateRange: "23 Jun 1915 → 24 Oct 1917",
        victor: "Stalemate",
        note: "A series of 12 battles fought between Italy and Austria-Hungary along the Isonzo River.",
        facts: [
            "Italy entered the war aiming to capture Austro-Hungarian lands populated by Italians.",
            "The terrain was brutal: alpine mountains and rocky plateaus where shelling caused deadly stone splinters.",
            "Italian General Cadorna launched repeated frontal assaults identical to those on the Western Front.",
            "The 12th Battle was actually Caporetto, where the Central Powers broke the stalemate."
        ],
        result: [
            "Half of all Italian war casualties (almost 1 million) occurred along this single river.",
            "Gains were measured in mere miles after years of fighting.",
            "The fighting physically altered the mountainous landscape due to massive explosive mines."
        ],
        img: "/Isonzo.png",
        front: "italian"
    },
    {
        name: "Arab Revolt",
        date: "1916–1918",
        dateRange: "5 Jun 1916 → 31 Oct 1918",
        victor: "Allies / Arab Rebels",
        note: "An uprising by Arab forces against the Ottoman Empire, aided by T.E. Lawrence.",
        facts: [
            "Sharif Hussein of Mecca sought independence from Ottoman rule in exchange for a unified Arab state.",
            "The British supplied weapons, gold, and military advisors, most notably T.E. Lawrence ('Lawrence of Arabia').",
            "Employed guerrilla tactics to sabotage the vital Hejaz Railway, tying down thousands of Ottoman troops.",
            "Culminated in the capture of Damascus in October 1918."
        ],
        result: [
            "Contributed significantly to the collapse of the Ottoman Empire.",
            "The British and French secretly divided the Middle East via the Sykes-Picot Agreement.",
            "The failure to grant full Arab independence laid the groundwork for modern Middle Eastern conflicts."
        ],
        img: "/ArabRevolt.png",
        front: "middle-east"
    },
    {
        name: "Sinai and Palestine Campaign",
        date: "1915–1918",
        dateRange: "28 Jan 1915 → 31 Oct 1918",
        victor: "Allies",
        note: "The British Empire's successful drive to push the Ottoman Empire out of the Levant.",
        facts: [
            "Began with an Ottoman repulse at the Suez Canal, threatening the lifeline of the British Empire.",
            "British forces, heavily reliant on Australian and New Zealand Light Horse, fought across the Sinai Desert.",
            "General Edmund Allenby captured Jerusalem in December 1917, fighting dismounted.",
            "Culminated in the decisive Battle of Megiddo in 1918."
        ],
        result: [
            "The Ottoman Empire lost control of the Levant (modern Israel, Palestine, Jordan, Lebanon, Syria).",
            "Resulted in the Armistice of Mudros, forcing the Ottomans out of the war.",
            "Led to the British Mandate for Palestine."
        ],
        img: "/Palestine.png",
        front: "middle-east"
    }
];

async function insertCleanData() {
    const allCleanData = [...denseWesternBattles, ...denseEasternBattles, ...newBattles];
    console.log('Inserting cleanly assembled data...');

    const { error } = await supabase.from('battles').insert(allCleanData);

    if (error) {
        console.error('❌ Failed to insert battles:', error);
    } else {
        console.log(`✅ Successfully added ${allCleanData.length} total UNIQUE historical events to the database!`);
    }
}

insertCleanData();
