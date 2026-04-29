---
'@marigold/docs': patch
---

docs(DST-1308): consolidate icon documentation onto the Iconography page

Merge the former `/components/content/icons` page into `/foundations/iconography` so principles, catalog, and engineering API live in one place. The new `Using icons in code` section covers installation, importing, sizing, color (`currentColor` + `className` recommended; `color` prop is literal CSS), filled brand icons (`createFilledIcon` couples `fill` and `color`; pass `stroke` to decouple), accessibility (auto `aria-hidden`), and refs. Old URLs redirect.

## Migration table

Old names from the legacy `@marigold/icons` set and their Lucide replacement. Names marked _custom_ are retained brand icons that still ship from `@marigold/icons` directly.

### UI

| Old             | New                |
| --------------- | ------------------ |
| Add             | `Plus`             |
| arrow-down      | `ArrowDown`        |
| arrow-left      | `ArrowLeft`        |
| arrow-right     | `ArrowRight`       |
| arrow-up        | `ArrowUp`          |
| BurgerMenu      | `Menu`             |
| check           | `Check`            |
| chevron-down    | `ChevronDown`      |
| chevron-left    | `ChevronLeft`      |
| chevron-right   | `ChevronRight`     |
| chevron-up      | `ChevronUp`        |
| CircleChecked   | `CircleDot`        |
| CircleUnchecked | `Circle`           |
| Delete          | `Trash2`           |
| ExternalLink    | `ExternalLink`     |
| Eye             | `Eye`              |
| Filter          | `ListFilter`       |
| IconMore        | `Ellipsis`         |
| Remove          | `Minus`            |
| search          | `Search`           |
| SettingDots     | `EllipsisVertical` |
| SquareChecked   | `SquareCheck`      |
| SquareUnchecked | `Square`           |

### Info

| Old             | New                    |
| --------------- | ---------------------- |
| accessibility   | `Accessibility`        |
| AutoRenew       | `RefreshCcw`           |
| Banned          | `Ban`                  |
| BatteryCharging | `BatteryCharging`      |
| BatteryEmpty    | `BatteryLow`           |
| BatteryFull     | `BatteryFull`          |
| BatteryHalf     | `BatteryMedium`        |
| Bus             | `BusFront`             |
| Calendar        | `Calendar`             |
| Camera          | `Camera`               |
| Clock           | `Clock`                |
| Direction       | `SquareArrowUpRight`   |
| Email           | `Mail`                 |
| EventDate       | `Calendar1`            |
| Exclamation     | `TriangleAlert`        |
| Feedback        | `MessageSquareMore`    |
| Food            | `Utensils`             |
| Globe           | `Globe`                |
| Home            | `House`                |
| Info            | `Info`                 |
| Marker          | `MapPin`               |
| MobilePhone     | `Smartphone`           |
| MobileSignal    | `SignalHigh`           |
| Notification    | `MessageSquareWarning` |
| Parking         | `CircleParking`        |
| PDF             | `PDF` _(custom)_       |
| Reports         | `FileText`             |
| Required        | `Asterisk`             |
| ResaleLogbook   | `BookOpenText`         |
| Spinner         | `Loader`               |
| Thumb           | `ThumbsUp`             |
| Truck           | `Truck`                |
| Wifi            | `Wifi`                 |

### Action

| Old          | New                     |
| ------------ | ----------------------- |
| Cancel       | `CircleX`               |
| Crop         | `Crop`                  |
| Download     | `Download`              |
| Edit         | `Pencil`                |
| ExportFile   | `SquareArrowOutUpRight` |
| FormatBold   | `Bold`                  |
| FormatItalic | `Italic`                |
| FormatSize   | `ALargeSmall`           |
| HighlightOff | `Power`                 |
| Location     | `LocateFixed`           |
| Lock         | `Lock`                  |
| LockOpen     | `LockOpen`              |
| Logout       | `LogOut`                |
| Pause        | `Pause`                 |
| Picture      | `Image`                 |
| Play         | `Play`                  |
| ResaleEdit   | `Cog`                   |
| Restart      | `RotateCcw`             |
| RotateLeft   | `RotateCcw`             |
| RotateRight  | `RotateCw`              |
| Save         | `Save`                  |
| Sort         | `ChevronsUpDown`        |
| SortDown     | `ChevronDown`           |
| SortUp       | `ChevronUp`             |
| Star         | `Star`                  |
| Stop         | `CircleStop`            |
| Underlined   | `Underline`             |
| Zoom         | `ZoomIn`                |

### Ticketing

| Old             | New                          |
| --------------- | ---------------------------- |
| Deal            | `BadgePercent`               |
| DesignTicket    | `DesignTicket` _(custom)_    |
| GiftCard        | `GiftCard` _(custom)_        |
| Membership      | `IdCardLanyard`              |
| Pickup          | `Store`                      |
| Price           | `Euro`                       |
| Resale          | `Resale` _(custom)_          |
| Scanner         | `Scanner` _(custom)_         |
| Seat            | `Armchair`                   |
| Selling         | `Tag`                        |
| Stadium         | `Stadium` _(custom)_         |
| Ticket          | `Ticket`                     |
| TicketInsurance | `TicketInsurance` _(custom)_ |
| Turnstile       | `Turnstile` _(custom)_       |

### User

| Old                    | New            |
| ---------------------- | -------------- |
| Cart                   | `ShoppingCart` |
| CreditCard             | `CreditCard`   |
| Group                  | `UsersRound`   |
| id                     | `IdCard`       |
| SmilieDissatisfied     | `Frown`        |
| SmilieNeutral          | `Meh`          |
| SmilieSatisfied        | `Smile`        |
| SmilieVeryDissatisfied | `Angry`        |
| SmilieVerySatisfied    | `Laugh`        |
| User                   | `UserRound`    |

### Social

| Old       | New                    |
| --------- | ---------------------- |
| Google    | `Google` _(custom)_    |
| Instagram | `Instagram` _(custom)_ |
| share     | `Share2`               |
| twitter   | `Twitter` _(custom)_   |
