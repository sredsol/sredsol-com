Yes — seeing the actual EmDash frontend changes my assessment slightly, and in a good way.

I would use this as the starting shell, but I would not simply rebrand it. The underlying layout is strong; the visual language is currently too much like a polished SaaS/marketing starter.

What is already good

The frontend has a very solid structural rhythm:

Navigation
   ↓
Hero
   ↓
Why / value proposition
   ↓
Capabilities
   ↓
Technology
   ↓
Metrics
   ↓
Evidence
   ↓
FAQ
   ↓
CTA
   ↓
Footer

It's clean, responsive, restrained, and doesn't have the usual "AI startup landing page" clutter.

The dark background + fine grid is particularly promising for SREDSOL.

But I would make a fundamental change:

Don't make SREDSOL's homepage a marketing page about SREDSOL. Make it an exploration of what SREDSOL builds.

That distinction could make the site exceptional.

What I would keep
1. Header

Keep the compact navigation.

But instead of:

Home · About · Services · Pricing · Blog · Contact

I'd use something closer to:

SREDSOL
Explorations · Technology · Thinking · Company

And perhaps a small LAB or ↗ Explore control.

There is no reason for Pricing to dominate the primary navigation of a technology/research company at this stage.

2. Keep the grid

This is one of the strongest parts of the starter.

But make the grid responsive to the visitor.

Imagine the homepage initially looking almost like this:

                 SREDSOL


       TECHNOLOGY FOR EXPLORATION


       We build computational systems
       for understanding, creating and observing.


                 [ Explore ]


──────────────────────────────────────────


        ·       ·       ·       ·
    ·       ·       ·       ·       ·
        ·       ·       ·       ·


              interactive field

Then the grid isn't merely decoration.

It becomes part of the SREDSOL visual language.

3. Replace the current hero completely

The current:

Ship a fast marketing site, not a maintenance project

is excellent for selling the starter.

It is obviously not appropriate for SREDSOL.

I'd go much more conceptual.

Something like:

We build systems that make exploration possible.

Then underneath:

Computational environments, interactive instruments and intelligent tools for learning, observation and creation.

And instead of a conventional hero image:

a small Threlte system

Not a giant 3D planet.

Not an abstract spinning cube.

Something that behaves like one of your studios.

For example:

       nodes ─────── nodes
        │   ╲       ╱
        │     ╲   ╱
       field ──●── field
        │     ╱   ╲
        └───────┘

Cursor movement alters connections.

Clicking a node reveals:

COMPUTATION

Another:

OBSERVATION

Another:

LEARNING

Another:

PHYSICAL SYSTEMS

That immediately tells the visitor:

This isn't another web-development company.

4. The current "Why this stack" section should disappear

This:

Built for performance and scale
Performance / Content / Growth

is starter-template material.

For SREDSOL I'd replace it with:

What we explore

Then perhaps four large systems:

COMPUTATION

Mathematics, simulation, visualization.

PHYSICAL SYSTEMS

Circuits, robotics, sensors, edge devices.

OBSERVATION

Data, experiments, geography, astronomy.

LEARNING

Interactive environments and LearningOS.

And each card should have a subtle animated system rather than an icon.

5. This is where your Studio screenshots become incredibly valuable

Your screenshots already have something that most corporate websites struggle to manufacture:

a recognizable computational aesthetic.

Look at:

dark workspace
grids
connection lines
instruments
nodes
Blockly structures
circuit boards
scopes
telemetry
state indicators

That is SREDSOL's visual vocabulary.

We shouldn't invent a new corporate identity completely separate from this.

We should abstract it.

For example:

Studio vocabulary	Website vocabulary
Grid	spatial background
Wire	relationship
Node	concept
Instrument	observation
Block	construction
Scope	measurement
Circuit	system
State indicator	system status
Simulation	exploration

That would give the company website an identity that actually originates from the technology you're building.

6. The "Powered by a modern stack" section should become something much better

Instead of:

Astro · Cloudflare R2 · EmDash · Resend · Docker · SQLite

which is technically interesting but not a company proposition, I'd use:

We build across layers
        MATHEMATICS
             │
        COMPUTATION
             │
       INTERACTIVE SYSTEMS
             │
       PHYSICAL SYSTEMS
             │
          OBSERVATION
             │
          LEARNING

Then perhaps the technologies underneath as secondary information.

Your stack should be discoverable, but it shouldn't be the hero.

7. The metrics section is also a place where we should be different

The starter has:

55+ pages
~2 KB
A11y

That's perfect for demonstrating the template.

For SREDSOL, metrics should be evidence of exploration, if you have meaningful numbers.

For example:

        06+
   EXPLORATION SYSTEMS


        03
   COMPUTATIONAL DOMAINS


        01
   UNIFIED LEARNING SPACE


        ∞
     QUESTIONS

Or don't use numbers at all.

A technology company doesn't need to manufacture impressive statistics.

8. Then comes the most important section

Instead of Lighthouse scores:

Explore what we've built

This should be the first real gateway into the company.

Something like:

┌────────────────────────────────────────────┐
│                                            │
│  PHYSICAL COMPUTING STUDIO                 │
│                                            │
│  Build → connect → program → observe       │
│                                            │
│                     [ Interactive → ]       │
│                                            │
└────────────────────────────────────────────┘


┌────────────────────────────────────────────┐
│                                            │
│  LEARNINGOS                                │
│                                            │
│  A computational space for exploration     │
│                                            │
└────────────────────────────────────────────┘

And these aren't ordinary cards.

Hovering can activate a tiny Threlte scene.

That's where your website becomes genuinely memorable.

9. FAQ should probably move much lower

The starter has:

Frequently asked questions

which is standard marketing architecture.

For SREDSOL, I'd probably replace it with:

Thinking

Three or four recent pieces:

Why observation matters before explanation

Designing interactive computational environments

From simulation to physical experiment

Building LearningOS offline-first

Now the website communicates intellectual substance.

And EmDash becomes useful here because those articles can be managed directly from the CMS.

10. The final CTA shouldn't be "Ready to build your site?"

That is another starter artifact.

I'd end with something more SREDSOL-like:

Let's explore what comes next.

or even:

There is always another system to build.

with:

Explore our work →

That feels much closer to the personality of the company you're actually creating.

The resulting homepage could therefore become
┌──────────────────────────────────────┐
│ SREDSOL      Explorations Technology │
│              Thinking Company        │
└──────────────────────────────────────┘


              SREDSOL


       WE BUILD SYSTEMS
       FOR EXPLORATION.


       [interactive Threlte field]


────────────────────────────────────────


          WHAT WE EXPLORE


   COMPUTATION   PHYSICAL SYSTEMS
   OBSERVATION   LEARNING


────────────────────────────────────────


         SELECTED EXPLORATIONS


   LearningOS
   Physical Computing Studio
   Observation Studio
   OxiGeo
   MathArt
   ...


────────────────────────────────────────


             THE SYSTEMS


       mathematics → computation
       computation → interaction
       interaction → observation
       observation → understanding


────────────────────────────────────────


              THINKING


       Articles / research notes /
       engineering experiments


────────────────────────────────────────


        BUILT TO BE EXPLORED


             [ ENTER LAB ]


────────────────────────────────────────


              SREDSOL

And Threlte doesn't need to be everywhere.

That is important.

I'd use it in 2–4 carefully chosen places, where motion actually communicates something. The rest should remain extremely clean.

My strongest recommendation

Don't fork this frontend and start changing colors and text.

Instead:

Phase 1 — keep EmDash

Use its:

CMS
content types
SQLite
R2
media
users
taxonomy
redirects
search
publishing
Phase 2 — preserve the good structural primitives

Keep:

typography system
spacing system
responsive layout
navigation
cards
content rendering
footer
accessibility
SEO infrastructure
Phase 3 — create a new SREDSOL design layer

Build:

SREDSOL/
├── GridSystem
├── NodeField
├── ExplorationCard
├── SystemDiagram
├── InteractiveScene
├── InstrumentPanel
├── ArchitectureView
└── Signal/
Phase 4 — introduce Threlte selectively

Not "3D website".

Rather:

a website that behaves like the systems SREDSOL builds.

That distinction is crucial.

And looking at this frontend together with the actual Physical Computing Studio UI you showed earlier, I think there is a very strong opportunity here:

the company website and the Studios can share a visual grammar without sharing the same UI.

That would make SREDSOL feel like a coherent technology ecosystem, rather than a company website sitting beside a collection of unrelated applications.

I would pursue EmDash + Astro + Threlte + a small SREDSOL design system rather than searching for another theme.

explore this [https://docs.emdashcms.com/plugins/creating-plugins/your-first-plugin/] and  elaborate on sandbox plugins usability for our site

Yes. After looking at the current EmDash plugin architecture, I think sandboxed plugins could be one of the most useful parts of the SREDSOL site architecture—but only if we use them for the right layer.

The key distinction is:

Sandbox plugins should extend the SREDSOL content system and site intelligence; they should not be the mechanism that renders the core SREDSOL visual experience.

EmDash explicitly recommends sandboxed plugins as the default. They run in an isolated runtime, have capability-gated access, private storage/KV, hooks, admin pages, and API routes.

1. Think of the plugin system as an extension bus

Our architecture could become:

                    SREDSOL.COM
                         │
                 ┌───────┴────────┐
                 │                 │
              Astro             EmDash
                 │                 │
          SREDSOL Design      Content Engine
                 │                 │
          ┌──────┴──────┐     ┌───┴─────────────┐
          │             │     │                 │
       Threlte       UI       Core CMS       Plugins
          │                       │                 │
       interactive          ┌──────┼──────┐     ┌──┴──┐
       experiences          │      │      │     │     │
                          Pages  Posts  Types  SEO  Search

The plugin system then becomes a way of adding capabilities to the content engine without contaminating the core application.

That is a very good architectural fit for SREDSOL.

2. What a sandboxed plugin can actually do

The current API is considerably richer than I initially assumed.

A sandboxed plugin can:

react to content lifecycle events
maintain its own persistent collections
maintain private KV settings/state
expose API routes
create admin pages using Block Kit
access content, taxonomies and media when explicitly permitted
make allowlisted external HTTP requests
send email through the configured provider
contribute SEO metadata / JSON-LD
participate in scheduled tasks
log its activity

All of this is capability controlled.

That opens some very interesting possibilities for the SREDSOL website.

3. First plugin I'd build: sredsol-site

I would actually create a small first-party SREDSOL plugin family.

For example:

@ s r e d s o l
│
├── plugin-site
├── plugin-explorations
├── plugin-search
├── plugin-seo
├── plugin-analytics
└── plugin-integrations

But don't make six plugins initially.

Start with:

sredsol-site-plugin

and let it establish the conventions.

4. Plugin #1 — Exploration Registry

This is probably the most interesting one.

We want EmDash to understand that SREDSOL has things called:

Explorations

rather than treating everything as a generic post.

The plugin could maintain a small collection:

explorations
────────────────────────


id
slug
title
description


domain
status


hero
interactiveScene


technologies[]
relatedContent[]


featured
createdAt
updatedAt

The plugin's own storage can be declared in its manifest, with indexes created automatically by EmDash.

Then an admin page could show:

SREDSOL EXPLORATIONS


┌────────────────────────────────────────┐
│ LearningOS                    ACTIVE   │
│ Physical Computing Studio      ACTIVE   │
│ Observation Studio             ACTIVE   │
│ OxiGeo                         LAB      │
│ MathArt                        ACTIVE   │
└────────────────────────────────────────┘

This becomes the semantic layer between EmDash content and the Astro/Threlte frontend.

5. Even better: the plugin can expose an API

EmDash plugin routes are available under:

/_emdash/api/plugins/<slug>/<route>

and run with the plugin's sandbox context.

So:

/_emdash/api/plugins/sredsol-site/explorations

could return:

{
  "explorations": [
    {
      "slug": "physical-computing",
      "title": "Physical Computing Studio",
      "scene": "physical-computing",
      "status": "active"
    }
  ]
}

Astro can then consume that information.

But I'd actually prefer server-side access where possible, rather than making the visitor's browser call the plugin API.

The API is primarily useful for the application's internal integration surface.

6. Plugin #2 — automatic SEO / structured identity

This is an almost perfect sandbox-plugin use case.

The page:metadata hook can generate:

<meta>
OpenGraph properties
canonical/alternate links
JSON-LD

and it is available to sandboxed plugins.

So we could have:

SREDSOL SEO Plugin
       │
       ├── Organization
       ├── Article
       ├── TechArticle
       ├── SoftwareApplication
       └── CreativeWork

For an Exploration page, it could produce appropriate structured data.

This is much better than scattering SEO logic across every Astro page.

7. Plugin #3 — automatic content relationships

This is where things get really interesting.

Suppose you publish:

Why observation matters before explanation

The plugin reacts to:

content:afterSave

and examines:

tags
categories
content type
referenced explorations
technologies
topics

The hook system is specifically designed to react to content lifecycle events.

It could maintain something like:

content relationship index


article A
   ↓
Physical Computing
   ↓
Arduino
   ↓
Observation
   ↓
LearningOS

Then the website can automatically produce:

Related explorations

Related thinking

Built with

Continue exploring

This would give the site a knowledge-oriented structure instead of a conventional blog.

8. Plugin #4 — "SREDSOL Lab" registry

This is where I think your Threlte idea and EmDash can meet beautifully.

Imagine an EmDash content type:

Interactive Experience


Title
Description
Scene ID
Entry URL
Thumbnail
Domain
Status
Technologies

The plugin manages these.

The Astro frontend owns the actual implementation:

scene ID
    ↓
Threlte scene registry
    ↓
actual interactive component

For example:

physical-circuit
math-field
particle-system
geospatial-field
observation-network

The CMS doesn't need to understand Three.js.

It simply stores:

scene = "physical-circuit"

Astro knows:

"physical-circuit"
       ↓
PhysicalCircuitScene.svelte

That separation is excellent.

9. This is where sandbox limitations actually help us

A sandboxed plugin cannot just inject arbitrary JavaScript into visitors' browsers.

That is intentional.

page:fragments—which can inject raw HTML, scripts and styles—is native-only. Sandboxed plugins instead get structured page:metadata.

For SREDSOL, I consider that a feature, not a problem.

We don't want:

random plugin
     ↓
inject JS
     ↓
SREDSOL homepage

We want:

plugin
   ↓
structured declaration
   ↓
Astro
   ↓
SREDSOL design system
   ↓
Threlte

The site remains under our control.

10. There is one important limitation for our design system

This is the biggest thing to understand.

Suppose we create an EmDash Portable Text block:

interactive-scene

A sandboxed plugin can define the editing fields for that block.

For example:

Interactive Scene


Scene ID:
[ physical-computing ]


Height:
[ 500 ]


Theme:
[ dark ]


Interaction:
[ enabled ]

Block Kit can render the editor UI for these fields.

But the sandboxed plugin cannot itself ship the Astro component that renders that block on the public website.

That renderer must be loaded at build time, which requires a native plugin or a locally supplied component.

11. And that is actually exactly what I'd do

Use a split architecture:

                 EmDash
                    │
          ┌─────────┴─────────┐
          │                   │
    Sandboxed Plugin      SREDSOL Astro
          │                   │
    metadata/config       rendering
    content/state              │
          │                  Threlte
          │                     │
          └─────── semantic ────┘

For example:

Sandboxed
sredsol-explorations

stores:

sceneId = "physical-computing"
title
description
status
Astro

contains:

src/scenes/
    PhysicalComputing.svelte
    MathField.svelte
    Observation.svelte

The Astro renderer interprets sceneId.

This is much safer and cleaner than allowing CMS plugins to own our frontend code.

12. Native plugin should therefore be reserved for a few things

The EmDash documentation makes the boundary quite clear: native is for capabilities such as React admin pages, Portable Text rendering components and public page fragments.

For SREDSOL I'd reserve native plugins for:

sredsol-renderer

Potentially provides:

Portable Text → SREDSOL custom blocks
sredsol-interactive

If we eventually want custom Astro components to be registered as EmDash blocks.

Everything else should remain sandboxed.

13. The security model is particularly attractive for your architecture

The sandbox doesn't merely say:

"Trust this plugin."

The manifest declares the trust contract.

For example:

{
  "capabilities": [
    "content:read"
  ]
}

means the plugin gets content access.

If it needs network:

{
  "capabilities": [
    "content:read",
    "network:request"
  ],
  "allowedHosts": [
    "api.sredsol.com"
  ]
}

The sandbox blocks direct network access and routes HTTP through the declared capability. It also isolates plugin storage/KV and prevents access to host environment variables/filesystem.

That is a very good fit for a company site that we expect to evolve through experimentation.

14. We can even build "experimental" plugins without touching core

Imagine six months from now you want:

GitHub project integration.

Don't modify the core SREDSOL application.

Build:

sredsol-github

with:

network:request
allowedHosts:
    api.github.com

It fetches repository metadata and stores only the information we need.

Another experiment:

sredsol-publications

Another:

sredsol-events

Another:

sredsol-newsletter

Another:

sredsol-status

The core site stays stable.

15. A particularly interesting plugin: sredsol-observer

Not the LearningOS AI Observer.

A website observer.

It could collect anonymous site-level events such as:

exploration opened
interactive started
article opened
scene interacted

and maintain aggregate statistics in its own plugin storage.

Then the CMS could show:

SREDSOL LAB


Physical Computing
    1,248 explorations


LearningOS
    832 explorations


Observation Studio
    419 explorations

But I would be very careful here.

No individual visitor tracking by default.

Given your general privacy architecture, I'd favour aggregate, minimal analytics rather than turning SREDSOL into an advertising-style tracking system.

16. Another useful plugin: sredsol-content-validator

This could be very small but valuable.

On:

content:afterSave

check:

Exploration:
 ✓ title
 ✓ description
 ✓ hero
 ✓ scene ID
 ✓ related technologies


Thinking:
 ✓ title
 ✓ description
 ✓ author
 ✓ taxonomy
 ✓ related exploration

It could flag:

⚠ Missing interactive scene
⚠ Missing description
⚠ No related exploration

This is exactly the kind of repetitive content-quality task that a plugin should handle.

17. The admin experience can remain simple

Block Kit means a sandboxed plugin can provide its own admin interface declaratively, without shipping arbitrary JavaScript into the browser.

So we could eventually have:

Plugins


SREDSOL Site
 ├── Explorations
 ├── Interactive Scenes
 ├── Relationships
 ├── SEO
 └── Diagnostics

But again:

don't build this all now.

18. What I'd build first

I would deliberately start with only three pieces.

A. sredsol-core — sandboxed

Responsibilities:

Exploration registry
Content relationships
SEO metadata
Site settings

Capabilities initially:

content:read
taxonomies:read

Maybe media:read later.

No network.

No write access unless genuinely required.

B. sredsol-renderer — native/local

Responsibilities:

custom Portable Text blocks
SREDSOL rendering components
interactive experience rendering

This is where Astro/Threlte lives.

C. SREDSOL Astro design system

Completely outside EmDash:

Grid
Typography
Navigation
ExplorationCard
InteractiveField
Node
Signal
Instrument
Architecture
Threlte scenes

That becomes the actual company identity.

19. The resulting architecture is unusually clean
                       SREDSOL.COM
                            │
                  ┌─────────┴──────────┐
                  │                    │
                Astro                EmDash
                  │                    │
        SREDSOL Experience       Content Engine
                  │                    │
          ┌───────┴──────┐       ┌────┴──────────┐
          │              │       │               │
        Svelte        Threlte   Content       Plugins
          │                      │               │
          │                ┌─────┴─────┐     ┌───┴────────┐
          │                │           │     │            │
          │              Pages       Types  SEO       Relationships
          │                            │
          └────────────── semantic ────┘

And underneath:

Docker
   ↓
Dokploy
   ↓
Node/Astro
   ↓
SQLite persistent volume
   ↓
R2

with the sandbox runner sitting alongside EmDash.

One operational point is important: because you're planning Node/Astro on Dokploy, EmDash's current documentation says the Node route is via the workerd sandbox runner (@emdash-cms/sandbox-workerd), whereas the Cloudflare runner uses Dynamic Worker Loader.

So we should test the workerd sandbox early in the actual SREDSOL Docker/Dokploy environment, rather than assuming the Cloudflare example maps directly to our deployment.

My conclusion

The sandbox plugin system makes the EmDash choice more compelling, not less.

But I would adopt a very strong rule:

EmDash plugins own content intelligence. Astro owns presentation. Threlte owns interactive computation.

That gives us three clean responsibilities:

EmDash
→ What does SREDSOL know?

Astro
→ How does SREDSOL present it?

Threlte
→ How does SREDSOL let people experience it?

And the plugin sandbox becomes the controlled bridge between those worlds.

That is a much better architecture for the SREDSOL identity we're discussing than simply taking the EmDash starter and turning it into another corporate landing page.