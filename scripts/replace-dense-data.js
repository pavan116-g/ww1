import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

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
        note: "A series of massive, chaotic meeting engagements between the French, British, and German armies during the opening weeks of the war. It was defined by the disastrous French 'Plan XVII' which called for suicidal frontal assaults by infantry in bright red trousers against entrenched German machine guns.",
        facts: [
            "The single bloodiest day in French military history occurred on August 22, 1914, when 27,000 French soldiers died in a single day—more than the British lost on the first day of the Somme.",
            "The French army, commanded by Joseph Joffre, wore essentially the exact same brightly colored uniforms they had worn in the 1870 Franco-Prussian war: deep blue coats, bright red kepis, and 'garance' red trousers, making them perfect targets for German artillery.",
            "The German army was executing the 'Schlieffen Plan', a massive sweeping right hook through neutral Belgium designed to encircle Paris and knock France out of the war in exactly 42 days before Russia could mobilize.",
            "The small, highly professional British Expeditionary Force (BEF) of 80,000 men clashed with the German First Army at Mons. The British rifle fire was so rapid and accurate the Germans believed they were facing massed machine guns."
        ],
        result: [
            "The French and British armies were forced into a chaotic, near-disastrous 14-day fighting retreat known as the 'Great Retreat' all the way to the outskirts of Paris.",
            "Combined casualties for all sides in the first month of the war exceeded 1,000,000 killed, wounded, or missing, setting the horrific tone for the entire conflict.",
            "The utter failure of traditional 19th-century infantry tactics forced the rapid adoption of trench warfare, steel helmets, and camouflage uniforms."
        ],
        img: "/Mons.jpg",
        front: "western"
    },
    {
        name: "First Battle of the Marne",
        date: "Sep 1914",
        dateRange: "6 Sep 1914 → 12 Sep 1914",
        victor: "Strategic Allied Victory",
        note: "The 'Miracle of the Marne' where the retreating French and British armies dramatically turned and counter-attacked the exhausted German army just 30 miles from Paris, permanently halting the Schlieffen Plan and dooming Europe to a 4-year war of attrition.",
        facts: [
            "As the German First Army swung southeast to encircle the retreating French, they exposed their right flank. French General Joseph Gallieni recognized the mistake and launched a desperate counterattack from the Paris garrison.",
            "In one of the most famous legends of the war, 600 Parisian 'Renault Type AG' taxi cabs were commandeered to rush 6,000 French reserve infantrymen to the front lines. While mostly symbolic, it boosted French morale immeasurably.",
            "German forward units had completely outrun their supply lines, marching over 20 miles a day for a month. Men were starving, their boots were rotting, and they were fighting on sheer adrenaline.",
            "The unexpected gap between the German First and Second armies was exploited by the British Expeditionary Force, forcing the German High Command to order a general retreat to the Aisne River."
        ],
        result: [
            "Germany's overarching strategic goal—to win a swift, decisive victory in the West before fighting Russia in the East—completely failed.",
            "The German army retreated to high ground along the River Aisne and began digging the first permanent trench networks of the war.",
            "This directly initiated the 'Race to the Sea', a series of flanking maneuvers that resulted in a continuous, unbroken line of trenches from the Swiss Alps to the English Channel."
        ],
        img: "/Marne1.jpg",
        front: "western"
    },
    {
        name: "First Battle of Ypres",
        date: "Oct–Nov 1914",
        dateRange: "19 Oct 1914 → 22 Nov 1914",
        victor: "Stalemate / Allied Defensive Victory",
        note: "The desperate culmination of the 'Race to the Sea' where the remnants of the British regular army successfully held the vital Belgian town of Ypres against massive German assaults, effectively destroying the pre-war British professional army in the process.",
        facts: [
            "Known in Germany as the 'Massacre of the Innocents of Langemarck' because waves of enthusiastic but poorly trained German university student volunteers were slaughtered by veteran British riflemen.",
            "British troops were spread so incredibly thin that cooks, clerks, and grooms were given rifles and rushed into the firing line to plug gaps during massive German breakthroughs.",
            "Much of the fighting took place around a forest known as Polygon Wood and a chateau at Gheluvelt. Hand-to-hand combat with bayonets and entrenching tools took place in near-freezing rain and mud.",
            "This battle marked the final end of mobile warfare on the Western Front. From November 1914 until March 1918, the lines would barely move more than a few miles in either direction."
        ],
        result: [
            "The British Expeditionary Force suffered 58,000 casualties, virtually wiping out the highly trained professional army that Britain had commanded prior to the war.",
            "The Ypres Salient was formed—a bulge in the Allied line surrounded on three sides by German artillery on higher ground, making it one of the deadliest sectors of the entire war.",
            "Britain was forced to rely heavily on Lord Kitchener's 'New Army' of civilian volunteers and massive scale conscription."
        ],
        img: "/Ypres1.jpg",
        front: "western"
    },
    {
        name: "Second Battle of Ypres",
        date: "Apr–May 1915",
        dateRange: "22 Apr 1915 → 25 May 1915",
        victor: "German Tactical Victory",
        note: "The battle that forever changed the nature of modern warfare, marking the first successful mass use of lethal chemical weapons (Chlorine gas) by the German army against unprepared French colonial and Canadian troops.",
        facts: [
            "At 5:00 PM on April 22, the Germans released 168 tons of chlorine gas from 5,730 hidden cylinders. A dense wall of heavy, yellow-green vapor carried by the wind drifted into the French Algerian and territorial trenches.",
            "The gas destroyed the respiratory organs of its victims, leading to death by asphyxiation. The horrific effects caused a massive, chaotic panic, opening a devastating 4-mile wide gap in the Allied lines.",
            "The gap was heroically plugged by the 1st Canadian Division. Lacking gas masks, soldiers urinated on their handkerchiefs and tied them over their faces, fighting desperately to hold the line for days.",
            "The famous poem 'In Flanders Fields' was written during this battle by Canadian physician Lieutenant Colonel John McCrae after presiding over the funeral of a friend."
        ],
        result: [
            "Chemical warfare became a terrifying, permanent fixture of the conflict, leading to an arms race of increasingly deadly agents like Phosgene and Mustard Gas, and complex respirator masks.",
            "The Allied lines around Ypres were permanently compressed closer to the town, making the salient even more vulnerable to German artillery fire for the remainder of the war.",
            "The staggering Canadian casualties (6,000 men, a third of their fighting force) began forging a distinct Canadian national military identity."
        ],
        img: "/Ypres2.jpg",
        front: "western"
    },
    {
        name: "Battle of Verdun",
        date: "Feb–Dec 1916",
        dateRange: "21 Feb 1916 → 18 Dec 1916",
        victor: "French Defensive Victory",
        note: "The longest, arguably most horrific battle in human history. German Chief of Staff Erich von Falkenhayn launched an offensive designed not to capture territory, but specifically to 'bleed France white' by forcing them to defend a symbolically vital fortress city to the death.",
        facts: [
            "The opening German bombardment fired over 1 million artillery shells over a 19-mile front in just 10 hours. It is estimated that 40 to 60 million shells were fired over the 10-month battle, permanently altering the topography of the region into a lunar landscape.",
            "The French defense was coordinated by General Philippe Pétain, who established a strict rotation system so that over 70% of the entire French army eventually served a tour in the 'Meat Grinder' of Verdun.",
            "The vital supply artery into the city was a single, narrow 20-foot wide road that came to be known as 'La Voie Sacrée' (The Sacred Way). Over 3,000 trucks passed along it every single day under constant artillery fire to keep the city supplied.",
            "Fort Douaumont, the largest and most heavily armed fort in the defensive ring, was humiliatingly captured without a shot fired in the opening days because the French had previously removed its garrison, unaware of the impending attack."
        ],
        result: [
            "An incomprehensible human catastrophe: estimated combined casualties (killed and wounded) range from 700,000 to nearly 1 million men over a piece of land roughly the size of a large city park.",
            "The French army survived, and the rallying cry 'Ils ne passeront pas!' (They shall not pass!) became a symbol of French national resistance and endurance.",
            "The sheer scale of the slaughter deeply traumatized the French nation and directly contributed to the widespread mutinies of the French army the following year."
        ],
        img: "/Verdun.jpg",
        front: "western"
    },
    {
        name: "Battle of the Somme",
        date: "Jul–Nov 1916",
        dateRange: "1 Jul 1916 → 18 Nov 1916",
        victor: "Stalemate / Inconclusive",
        note: "A massive joint British and French offensive designed to relieve the unbearable pressure on the French at Verdun. The first day of the battle remains the blackest day in the history of the British Army.",
        facts: [
            "Prior to the infantry assault, the British fired an unprecedented 1.5 million artillery shells over 7 days to destroy the German barbed wire and deep bunkers. Over 30% of the shells were duds, and the bombardment completely failed to destroy the deep, reinforced concrete German dugouts.",
            "On July 1st, at 7:30 AM, tens of thousands of British soldiers went 'over the top' walking slowly in straight lines, as ordered. The German machine gunners simply emerged from their bunkers and slaughtered them. Britain suffered 57,470 casualties (19,240 dead) on the very first morning.",
            "Many of the British units destroyed were 'Pals Battalions'—men from the same town, factory, or sports club who had enlisted together. Entire generations of young men from specific northern English towns were wiped out in a single morning.",
            "The battle marked the very first use of tanks in warfare. The British deployed 'Mark I' tanks in September 1916. While terrifying to the Germans, they were slow, mechanically unreliable, and quickly bogged down in the cratered mud."
        ],
        result: [
            "Over 1,000,000 men were killed or wounded over the course of 141 days. For this apocalyptic cost, the Allies advanced a maximum depth of just 6 miles (10 km).",
            "Despite the tactical failure, the constant, grinding pressure inflicted devastating losses on the experienced core of the German army, fundamentally weakening it for the remainder of the war.",
            "The horrific realities of industrial war irreversibly shattered the romanticized, 19th-century view of military glory held by the British public."
        ],
        img: "/Somme.jpg",
        front: "western"
    },
    {
        name: "Battle of Vimy Ridge",
        date: "Apr 1917",
        dateRange: "9 Apr 1917 → 12 Apr 1917",
        victor: "Canadian/Allied Victory",
        note: "A meticulously planned, brilliantly executed assault where all four divisions of the Canadian Corps attacked together for the first time, capturing a heavily fortified 7-kilometer ridge that both the British and French had previously failed to take at the cost of hundreds of thousands of lives.",
        facts: [
            "The attack was preceded by weeks of intense, highly scientific preparatory bombardment. The British and Canadians used 'sound ranging' and 'flash spotting' to map and destroy 83% of all German artillery batteries on the ridge before the infantry even stepped off.",
            "Troops rehearsed the assault for weeks on full-scale modeled layouts using aerial photographs. Every single soldier was given a map and knew his specific objective, a stark contrast to previous battles where only officers held maps.",
            "The infantry advanced directly behind a 'creeping barrage'—a perfectly timed, rolling wall of explosive artillery fire that moved 100 yards every 3 minutes. The infantry advanced so closely behind the explosions that they often caught German defenders still hiding in their dugouts.",
            "Engineers dug massive subterranean tunnels through the chalk, some equipped with electric lighting and tramways, allowing entire staging brigades to arrive at the front line completely unseen by German spotters."
        ],
        result: [
            "A stunning tactical success: the ridge was entirely captured within three days with roughly 10,000 casualties—a fraction of what older tactics would have cost.",
            "The victory became a profound, foundational moment for Canadian national identity. As Brigadier-General A.E. Ross later said, it was at Vimy that Canada 'went up the ridge a colony, but came down a nation.'",
            "The tactical innovations (platoon-level tactics, Lewis gun specialization, the creeping barrage) became the standard blueprint for all successful Allied offensives for the rest of the war."
        ],
        img: "/Vimy.jpg",
        front: "western"
    },
    {
        name: "Battle of Passchendaele (Third Ypres)",
        date: "Jul–Nov 1917",
        dateRange: "31 Jul 1917 → 10 Nov 1917",
        victor: "Stalemate / Minor Allied Tactical Gain",
        note: "The absolute embodiment of the senseless horror and misery of the Western Front. Fought in the worst weather in a generation, the battlefield became a bottomless, apocalyptic swamp of liquid mud where men, horses, and tanks literally drowned without a shot being fired.",
        facts: [
            "The British preliminary bombardment of 4.2 million shells completely destroyed the delicate drainage systems of the flat, low-lying Flanders terrain. This, combined with the heaviest rainfall in 30 years, turned the 'battlefield' into a vast, churned sea of deep, stinking mud.",
            "Because traditional trenches could not be dug in the liquid mud, the Germans constructed interlocking networks of heavily reinforced concrete 'pillboxes' that could withstand direct artillery hits and provide devastating crossfire.",
            "The conditions were unspeakable. Duckboards (wooden walkways) had to be laid across the sea of craters. If a soldier slipped off the boards under heavy equipment, the suction of the mud was so tremendous they often could not be pulled out and slowly drowned in the slurry over several days.",
            "The battle finally ended when the Canadian Corps was essentially ordered on a suicide mission to capture the ruined village of Passchendaele, taking 16,000 casualties to capture a stretch of mud that had zero strategic value."
        ],
        result: [
            "Over 500,000 combined casualties across British, Imperial, and German forces for an advance of exactly 5 miles (8 km). All of this ground was promptly lost the following spring during the German March offensives.",
            "The extreme futility of the operation permanently severely damaged the reputation of British Commander-in-Chief Sir Douglas Haig.",
            "The sheer horror of the mud, gas, and slaughter cemented Passchendaele alongside the Somme as the defining tragedy of World War I in British memory."
        ],
        img: "/Passchendaele.jpg",
        front: "western"
    },
    {
        name: "The Spring Offensive (Kaiserschlacht)",
        date: "Mar–Jul 1918",
        dateRange: "21 Mar 1918 → 18 Jul 1918",
        victor: "Initial German Success / Ultimate Allied Victory",
        note: "Germany's massive, desperate 'do or die' gamble to break the trench stalemate and win the war before millions of fresh American troops could arrive. Utilizing specialized stormtroopers, they briefly destroyed the British front lines before running out of momentum and supplies.",
        facts: [
            "With Russia knocked out of the war by the Bolshevik Revolution, Germany transferred 50 veteran divisions by train from the Eastern Front to the West, giving them a brief numerical superiority.",
            "Instead of the usual days-long bombardments, the Germans used a short, intensely hurricane bombardment masterminded by Colonel Georg Bruchmüller, mixing gas and high explosives to blind and suppress defenders rather than purely destroying them.",
            "The attack was spearheaded by elite 'Stoßtruppen' (Stormtroopers) armed with flamethrowers, submachine guns, and satchel charges. Rather than attacking strongpoints, they used dense fog to infiltrate deep into the British rear, bypassing resistance and isolating front-line trenches.",
            "The offensive was stunningly successful at first, capturing more ground in a week than the Allies had taken in three years, completely shattering the British Fifth Army and plunging Paris into panic."
        ],
        result: [
            "The German troops, starving after years of blockade, lost crucial momentum when they overran British supply depots filled with unimaginable luxuries like corned beef, chocolate, wine, and warm boots, stopping to loot rather than advance.",
            "The deep salients the Germans created were highly vulnerable to counter-attack and impossible to supply. Having lost 680,000 of their absolute best assault troops, the German army was functionally exhausted and broken.",
            "The crisis forced the squabbling Allies to finally appoint a single supreme commander, French General Ferdinand Foch, paving the way for the coordinated counter-offensive that ended the war."
        ],
        img: "/SpringOffensive.jpg",
        front: "western"
    },
    {
        name: "Hundred Days Offensive",
        date: "Aug–Nov 1918",
        dateRange: "8 Aug 1918 → 11 Nov 1918",
        victor: "Decisive Allied Win",
        note: "The brilliant, relentless, and finally war-winning Allied counter-offensive. Combining infantry, hundreds of tanks, aircraft, and creeping barrages into a modern 'combined arms' operation, it broke the supposedly impregnable Hindenburg Line and forced the collapse of the German Empire.",
        facts: [
            "The opening battle at Amiens on August 8th was described by German General Erich Ludendorff as 'The Black Day of the German Army'. Over 400 British and French tanks completely overran the exhausted German defenses, leading thousands of demoralized German troops to surrender without fighting.",
            "Unlike previous static offensives like the Somme, the Allies adopted a strategy of hitting the enemy hard, then immediately halting the attack once resistance stiffened, quickly shifting the attack to an entirely different sector, keeping the Germans constantly off balance.",
            "American forces (the AEF) under General John J. Pershing launched their massive Meuse-Argonne offensive. Though inexperienced and suffering horrific casualties, the sheer weight of 1.2 million fresh American troops overwhelmed the shattered German lines.",
            "British, Australian, and Canadian forces executing highly sophisticated combined-arms tactics methodically dismantled the massive, concrete bunker networks of the 'Hindenburg Line' piece by piece."
        ],
        result: [
            "The relentless pressure collapsed not just the German Army, but the military forces of Germany's allies: Bulgaria, the Ottoman Empire, and Austria-Hungary all sued for peace in rapid succession.",
            "A naval mutiny in Kiel triggered a widespread revolution across Germany. Kaiser Wilhelm II abdicated and fled to the Netherlands.",
            "Facing imminent total military collapse and starvation at home, the German High Command signed the Armistice in a railway carriage in the forest of Compiègne, ending the fighting at exactly 11:00 AM on the 11th of November, 1918."
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
        note: "One of the most spectacular encirclement victories in military history. A heavily outnumbered German force intercepted unencrypted Russian radio broadcasts to organize a massive double envelopment, completely annihilating the invading Russian Second Army in the forests of East Prussia.",
        facts: [
            "The Russian army mobilized surprisingly fast, invading East Prussia while the bulk of the German army was fighting in France. However, they were poorly supplied, lacked basic logistics, and were critically short of artillery shells and rifles.",
            "Due to severe bureaucratic incompetence and a lack of copper wire, the Russian First and Second Armies broadcast their daily marching orders, troop strengths, and exact locations 'in the clear' without using any radio encryption.",
            "The commanders of the two Russian armies, General von Rennenkampf and General Samsonov, absolutely despised each other personally dating back to the Russo-Japanese War, to the point they refused to coordinate or aid each other during the battle.",
            "German commanders Paul von Hindenburg and Erich Ludendorff used trains to rapidly shuttle troops completely around the flanks of Samsonov's Second Army, springing a massive trap in the dense forests and lakes of Tannenberg."
        ],
        result: [
            "The Russian Second Army was completely obliterated. Over 92,000 Russian soldiers were captured and over 70,000 killed or wounded, compared to just 12,000 German casualties.",
            "General Samsonov, utterly crushed by the scale of the disaster and fearing the wrath of the Tsar, walked alone into the forest at night and shot himself in the head.",
            "The victory elevated Hindenburg and Ludendorff to near-mythological status in Germany, eventually granting them effectively dictatorial control over the entire German war effort and civilian government."
        ],
        img: "/Tannenberg.jpg",
        front: "eastern"
    },
    {
        name: "First Battle of the Masurian Lakes",
        date: "Sep 1914",
        dateRange: "7 Sep 1914 → 14 Sep 1914",
        victor: "German Victory",
        note: "The immediate follow-up to the disaster at Tannenberg. The German Eighth Army turned north and utilized the difficult lake terrain to outflank and defeat the Russian First Army, completely evicting all Russian forces from German territory.",
        facts: [
            "After destroying the Russian Second Army, the Germans turned to deal with General von Rennenkampf's Russian First Army, which had remained entirely stationary for almost a week, doing nothing to help in the previous battle.",
            "The terrain of East Prussia is dominated by a treacherous network of lakes, swamps, and dense pristine forests. The Germans, intimately familiar with their home terrain, severely outmaneuvered the lost and confused Russian columns.",
            "Despite severe pressure, the Russian army managed to execute a somewhat orderly fighting retreat rather than suffering the total encirclement and annihilation experienced at Tannenberg, largely saved by a desperate rearguard action by two Russian divisions.",
            "Hindenburg again commanded the German forces, cementing his legendary reputation as the 'Savior of East Prussia'."
        ],
        result: [
            "Russia was definitively expelled from German soil and would never again cross the pre-war border into Germany for the duration of World War I.",
            "The Russian army lost another 125,000 men and 150 vital artillery pieces, severely crippling their early war offensive capabilities.",
            "Despite these massive victories in the East, the troops Germany had diverted away from the Schlieffen Plan to defend Prussia likely cost them the vital First Battle of the Marne in the West."
        ],
        img: "/Masurian.jpg",
        front: "eastern"
    },
    {
        name: "Battle of Galicia (Lemberg)",
        date: "Aug–Sep 1914",
        dateRange: "23 Aug 1914 → 11 Sep 1914",
        victor: "Decisive Russian Win",
        note: "While the Russians were being crushed by the Germans in the north, they were simultaneously inflicting an absolutely catastrophic defeat upon the Austro-Hungarian Empire in the south, destroying a third of the Austro-Hungarian Army in mere weeks.",
        facts: [
            "Austro-Hungarian Chief of Staff Conrad von Hötzendorf launched an overly ambitious offensive into Russian Poland, severely underestimating the size and incredible speed of the Russian mobilization in the south.",
            "The Austro-Hungarian army was a logistical nightmare, composed of 11 distinct ethnic groups (Austrians, Hungarians, Czechs, Croats, etc.) speaking different languages. Many Slavic troops had no desire to fight their Russian 'brothers' and surrendered en masse.",
            "The Russian cavalry, particularly the feared Cossacks, ran wild behind the shattered Austro-Hungarian lines, severing rail links and capturing vast amounts of supplies.",
            "The Russians captured the provincial capital of Lemberg (modern Lviv, Ukraine) and drove the Austrians almost entirely out of the region of Galicia, advancing to the foothills of the Carpathian Mountains."
        ],
        result: [
            "A massive catastrophe for Austria-Hungary: they suffered over 400,000 casualties (including 100,000 taken prisoner) and lost a devastating amount of their professional officer corps and rolling stock.",
            "Germany was forced to divert critical resources and entire armies south to constantly prop up and rescue their rapidly collapsing Austro-Hungarian allies, whom German commanders derisively referred to as 'being shackled to a corpse.'",
            "The Russian victory maintained morale at home despite the disaster at Tannenberg, and proved the Russian Imperial Army was highly capable of massive operational success when supplied."
        ],
        img: "/Galicia.jpg",
        front: "eastern"
    },
    {
        name: "Siege of Przemyśl",
        date: "Sep 1914–Mar 1915",
        dateRange: "16 Sep 1914 → 22 Mar 1915",
        victor: "Russian Victory",
        note: "The longest continuous siege of the First World War. 120,000 Austro-Hungarian troops were trapped inside a massive ring of fortresses by the advancing Russian army, enduring months of freezing conditions, starvation, and disease before succumbing.",
        facts: [
            "Przemyśl was considered one of the most formidable fortress complexes in Europe, but it was dangerously overcrowded with refugees and retreating soldiers, straining its food stores almost instantly.",
            "Through the brutal winter of 1914–1915, the trapped garrison resorted to eating all 10,000 of their cavalry horses, then stray dogs, and finally crows. Disease, particularly cholera and typhus, ravaged the defenders.",
            "Conrad von Hötzendorf launched multiple huge, costly winter offensives through the freezing Carpathian mountain passes in desperate attempts to relieve the fortress, suffering over 800,000 casualties to cold and Russian fire, but failed.",
            "Before surrendering, the garrison destroyed their artillery and blew up the bridges, flooding the fortress tunnels so the weapons could not be used by the advancing Russians."
        ],
        result: [
            "120,000 Austro-Hungarian soldiers, including 9 prominent generals, marched into harsh Russian captivity. Most were sent to brutal prison camps in Siberia, where a staggering number died.",
            "It represented a massive propaganda victory for the Russian Empire and completely demoralized the Austro-Hungarian civilian populace.",
            "However, the massive Russian army tied down in conducting the months-long siege prevented them from pushing further into Germany's industrial heartland of Silesia."
        ],
        img: "/Przemysl.jpg",
        front: "eastern"
    },
    {
        name: "Gorlice–Tarnów Offensive",
        date: "May–Jun 1915",
        dateRange: "2 May 1915 → 22 Jun 1915",
        victor: "Strategic German/Austrian Win",
        note: "A spectacular, utterly devastating joint German and Austro-Hungarian offensive that completely shattered the Russian front lines. The massive artillery superiority of the Germans caused a 'Great Retreat' of the entire Russian army spanning hundreds of miles.",
        facts: [
            "The German commander, August von Mackensen, amassed a terrifying concentration of heavy artillery: roughly one heavy gun every 40 yards. Over 700,000 shells were fired in just 4 hours, literally burying the Russian defenders alive in their shallow trenches.",
            "The Russian army was experiencing an acute and crippling 'shell crisis'. Russian artillerymen were strictly limited to firing a maximum of 3 to 5 shells per day, while German guns fired relentlessly day and night.",
            "Russian infantry were sent to the front without rifles, ordered to wait for a comrade to be killed to pick up his weapon. They fought with bayonets, entrenching tools, and even bare hands against German artillery and machine guns.",
            "The Russian lines completely collapsed. For millions of Russian soldiers, the next four months were a desperate, starving, chaotic foot-retreat eastward, burning villages and fields behind them."
        ],
        result: [
            "The Central Powers recaptured the entirety of Galicia, captured the vital city of Warsaw, and drove the Russians out of Poland, advancing over 300 miles east.",
            "The Russian army suffered between 1 and 2 million casualties (mostly prisoners) during the Great Retreat, fundamentally crippling the combat effectiveness of the Imperial army.",
            "In a disastrous political move, Tsar Nicholas II fired his popular uncle Grand Duke Nicholas from command and took personal, direct control of the armed forces at the front, directly tying all future military failures to the royal throne itself."
        ],
        img: "/Gorlice.jpg",
        front: "eastern"
    },
    {
        name: "Brusilov Offensive",
        date: "Jun–Sep 1916",
        dateRange: "4 Jun 1916 → 20 Sep 1916",
        victor: "Decisive Russian Win",
        note: "Russia's greatest feat of arms during WWI and the most lethal offensive in human history up to that point. Utilizing completely revolutionary new tactics, General Aleksei Brusilov utterly shattered the Austro-Hungarian lines, bringing the empire to the brink of total collapse.",
        facts: [
            "Instead of massing troops in one obvious location, Brusilov attacked simultaneously across an incredibly wide 300-mile front, preventing the Austrians from knowing where to send their reserves.",
            "Instead of days of useless preliminary bombardment, Russian artillery fired short, highly accurate, intense bursts with no warning whatsoever, immediately followed by fast-moving 'shock troops' penetrating deep into the trenches—tactics the Germans would later copy for their 1918 stormtroopers.",
            "Russian sappers dug massive underground tunnels to within 50 yards of the Austrian lines, allowing infantry to emerge right on top of the stunned defenders without having to cross 'no man's land'.",
            "The Austro-Hungarian army dissolved in panic. Entire regiments, particularly Czech and Slovak units who hated the empire, surrendered en masse without firing a shot."
        ],
        result: [
            "An unmitigated catastrophe for Austria-Hungary: they suffered over 1 million casualties (including 400,000 prisoners) and essentially lost the ability to field an independent army for the rest of the war.",
            "Germany was forced to halt their massive assault on Verdun in the West and rush troops east to prevent the total collapse of the Eastern Front, effectively saving France.",
            "Despite the brilliant success, the Russian army still suffered over 1 million casualties, pushing an already exhausted and starving Russian society further to the breaking point of the impending 1917 revolution."
        ],
        img: "/Brusilov.jpg",
        front: "eastern"
    },
    {
        name: "The Kerensky Offensive",
        date: "Jul 1917",
        dateRange: "1 Jul 1917 → 19 Jul 1917",
        victor: "Central Powers Victory",
        note: "The final, utterly disastrous gasp of the Russian military. Ordered by the newly formed Provisional Government following the February Revolution, the poorly disciplined, mutinous Russian army attacked the Germans and collapsed almost immediately.",
        facts: [
            "Tsar Nicholas II had recently been overthrown in the February Revolution. The new, fragile Provisional Government led by Alexander Kerensky disastrously decided to honor standing treaties with France and Britain to stay in the war, despite massive civilian starvation and war weariness.",
            "The Russian army was completely demoralized. 'Soldier Committees' had formed in every regiment, holding votes on whether or not they felt like obeying officer orders. The officer corps had lost all authority.",
            "While initial assaults against weakened Austro-Hungarian units were marginally successful, the moment the Russians encountered fresh, heavily armed German units, entire divisions simply refused to fight, dropped their weapons, and began walking home.",
            "To encourage the mutinous men, Kerensky formed 'Women's Battalions of Death' to shame the male soldiers into fighting, but even this desperate propaganda measure failed."
        ],
        result: [
            "The Russian army ceased to exist as a functional fighting force. Over the coming weeks, millions of armed peasant soldiers deserted the front lines, hijacking trains to return to their villages to claim land.",
            "The catastrophic failure of the offensive destroyed all remaining civilian support for the Provisional Government, directly paving the way for Vladimir Lenin and the Bolsheviks to seize power in the violent October Revolution later that year.",
            "A complete victory for Germany, leading to the devastating Treaty of Brest-Litovsk where Russia was forced to cede massive territories (Poland, Ukraine, the Baltics) in exchange for peace, ending the war on the Eastern Front."
        ],
        img: "/Kerensky.jpg",
        front: "eastern"
    }
];

async function replaceData() {
    console.log('Replacing existing Western and Eastern front battles with denser history...');

    const { error: delError1 } = await supabase.from('battles').delete().eq('front', 'western');
    const { error: delError2 } = await supabase.from('battles').delete().eq('front', 'eastern');

    if (delError1 || delError2) {
        console.error('Error deleting old records:', delError1 || delError2);
        return;
    }

    const { error: insError1 } = await supabase.from('battles').insert(denseWesternBattles);
    const { error: insError2 } = await supabase.from('battles').insert(denseEasternBattles);

    if (insError1 || insError2) {
        console.error('Error inserting new dense records:', insError1 || insError2);
    } else {
        console.log(`✅ Successfully inserted ${denseWesternBattles.length} Western and ${denseEasternBattles.length} Eastern historically dense battles!`);
    }
}

replaceData();
