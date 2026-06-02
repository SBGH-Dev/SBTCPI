<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

// REWRITE THE WHOLE WEB, TABLES FROM THE BEGIENG !!
// create a website, good looking with no errors

// First of all we have to ckeck, if HO or branch User (In DB we save)
// when first login, the landing page will be a dash board with products filter, date filter, unit filter, type (NET, GROSS), apply button, reset button (Better if component based on access), now logic:

// Super-Admin is a special user that can see literallly evrything !! (With Admin pannel as well), all products
// If HO and have level 1 access, then he can see everything (Put not admin pannet) -- ALL PRODUCTS, ALL branches
// IF HO ane level 2, can be Indomie SPV (Product filter can be only indomie prod), Non-Indomie SPV can see only non indomie

// If branch, area manager a diff dashboard with filters, branch , customer , channel for now (good if component ), the logged in user can see only his branched maintanted in a specific table you create, my branches are like 101-jeddah , keep the value as code alywais (101), display 101- jeddah

// side menus and sub menus are bases on access as well, take from db well
// like sales under it sub menus sales variance for now, create only 1 table calles sales variance with dummy data to tese
// backend .net 8, closed xml for excel export,QuestPDF for pdf , next js 16 front end !!, dont use anything else , model, serfivce, repo, controller

// create new tables, evaluate all acces based on empcd not user id, no regidter nedded, only login

// all filters from db, dummmy for things i didnt provide, i need no errors, call the app wazaranBI

// recreate the project with diffrent names, new tables if nedded and give it to me, no mistakes nedded !!

<!-- tmst_bi_salespoint -- create (branch code and branch name only )
tmst_bi_product -- create the same as mine
[prod_cd] [varchar](50) NOT NULL,
	[prod_nm] [varchar](500) NULL,
	[prod_arabic] [nvarchar](500) NULL,
	[prod_cd_parent] [varchar](50) NULL,
	[level_no] [int] NULL,
	[supervisor_cd] [varchar](50) NULL,
	[deleted] [bit] NULL,
 CONSTRAINT [PK_tmst_product] PRIMARY KEY CLUSTERED
(
	[prod_cd] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] -->

sales points i need attached :
