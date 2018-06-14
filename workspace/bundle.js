class AuditCyclePlanPDF {

    // *                                                                                            I N I T I A L I Z E
    // -----------------------------------------------------------------------------------------------------------------

    constructor() {
        this.columnWidth = 4.1;
        this.rowHeight = 6.5;
        this.cursor = {x: 0, y: 0};
    }

    // *                                                                              P R I V A T E - F U N C T I O N S
    // -----------------------------------------------------------------------------------------------------------------

    translate(text) {
        return ({
            'AuditCyclePlan': getLangTextByKey('auditCyclePlan'),
            'Customer': getLangTextByKey('customer'),
            '#Ref.': getLangTextByKey('refNo'),
            'Standard': getLangTextByKey('standard'),
            'First Day': getLangTextByKey('firstDay'),
            'Last Day': getLangTextByKey('lastDay'),
            'Audit File ID': 'Audit File ID',
            'Requirements': getLangTextByKey('auditCycleManager')['requirements'],
            'S2/Re': 'S2/Re',
            'Surv': 'Surv',
            'Processes of the Organization': getLangTextByKey('auditCycleManager')['processesOfTheOrganization'],
        })[text];
    }

    // *                                                                                P U B L I C - F U N C T I O N S
    // -----------------------------------------------------------------------------------------------------------------

    generate(header, languageID) {

        this.header = header;
        this.pdf = new jsPDF();

        this.pdf.addFileToVFS('ARIAL_CE.ttf', window.fonts.vfs['ARIAL_CE.ttf']);
        this.pdf.addFileToVFS('ARIAL_FA.ttf', window.fonts.vfs['ARIAL_FA.ttf']);
        this.pdf.addFileToVFS('ipaexm.ttf', window.fonts.vfs['ipaexm.ttf']);
        this.pdf.addFileToVFS('malgun.ttf', window.fonts.vfs['malgun.ttf']);
        this.pdf.addFileToVFS('Roboto-Italic.ttf', window.fonts.vfs['Roboto-Italic.ttf']);
        this.pdf.addFileToVFS('Roboto-Medium.ttf', window.fonts.vfs['Roboto-Medium.ttf']);
        this.pdf.addFileToVFS('Roboto-Regular.ttf', window.fonts.vfs['Roboto-Regular.ttf']);
        this.pdf.addFileToVFS('SIMSUN.ttf', window.fonts.vfs['SIMSUN.ttf']);
        this.pdf.addFileToVFS('DejaVuSansCondensed.ttf', window.fonts.vfs['DejaVuSansCondensed.ttf']);
        this.pdf.addFileToVFS('DejaVuSansCondensed-Bold.ttf', window.fonts.vfs['DejaVuSansCondensed-Bold.ttf']);

        switch (languageID) {

            case 'jp':
                this.pdf.addFont('ipaexm.ttf', 'ipaexm', 'normal');
                this.pdf.addFont('ipaexm.ttf', 'ipaexm', 'bold');
                this.pdf.setFont('ipaexm');
                break;

            case 'cn':
            case 'tw':
                this.pdf.addFont('SIMSUN.ttf', 'SIMSUN', 'normal');
                this.pdf.addFont('SIMSUN.ttf', 'SIMSUN', 'bold');
                this.pdf.setFont('SIMSUN');
                break;

            case 'kr':
                this.pdf.addFont('ARIAL_CE.ttf', 'ARIAL_CE', 'normal');
                this.pdf.addFont('ARIAL_CE.ttf', 'ARIAL_CE', 'bold');
                this.pdf.setFont('ARIAL_CE');
                break;

            case 'sk':
                this.pdf.addFont('SIMSUN.ttf', 'SIMSUN', 'normal');
                this.pdf.addFont('SIMSUN.ttf', 'SIMSUN', 'bold');
                this.pdf.setFont('SIMSUN');
                break;

            case 'ir':
                this.pdf.addFont('ARIAL_FA.ttf', 'ARIAL_FA', 'normal');
                this.pdf.addFont('ARIAL_FA.ttf', 'ARIAL_FA', 'bold');
                this.pdf.setFont('ARIAL_FA');
                break;

            default:
                // ------------------------------------------------------------------------------------ DejaVuSans is working
                // this.pdf.addFont('DejaVuSansCondensed.ttf', 'DejaVuSans', 'normal');
                // this.pdf.addFont('DejaVuSansCondensed-Bold.ttf', 'DejaVuSans', 'bold');
                // this.pdf.setFont('DejaVuSans');

                // ---------------------------------------------------------- Roboto NOT working (inside make-pdf is working)
                this.pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
                this.pdf.addFont('Roboto-Medium.ttf', 'Roboto', 'bold');
                this.pdf.setFont('Roboto');
                break;
        }

        this.addHeader();
    }

    download(filename) {
        this.pdf.save(`${filename}.pdf`);
    }

    getBlob() {
        return this.pdf.output('blob');
    }

    // *                                                                              P R I V A T E - F U N C T I O N S
    // -----------------------------------------------------------------------------------------------------------------

    addHeader() {
        const {translate} = this;

        this.pdf.setFontSize(12);
        console.log('$db> bundle.addHeader(11):',translate('AuditCyclePlan'));
        this.pdf.addImage('data:image/jpeg;base64,/9j/4Q04RXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAiAAAAcgEyAAIAAAAUAAAAlIdpAAQAAAABAAAAqAAAANQACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpADIwMTY6MDQ6MjAgMTY6MzM6NTMAAAOgAQADAAAAAf//AACgAgAEAAAAAQAAAI6gAwAEAAAAAQAAAEMAAAAAAAAABgEDAAMAAAABAAYAAAEaAAUAAAABAAABIgEbAAUAAAABAAABKgEoAAMAAAABAAIAAAIBAAQAAAABAAABMgICAAQAAAABAAAL/gAAAAAAAABIAAAAAQAAAEgAAAAB/9j/7QAMQWRvYmVfQ00AAv/uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAEMAjgMBIgACEQEDEQH/3QAEAAn/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/APVUkkklKSTOcGiSYAWdmdVbW70qgX2zAa3mf5btdv8AU/nP+KRAJ2VboOe1sBxgngdz8AoPuc1pcGOI+B1/ssD3/wDQWHnZmQGHFDgHH+fezTX/AELXfTdt/wAI9zlRx8cXWtYX7W8vdPDRq5yeMelk0tMnobM3IFLrGUWuIIa2sMhx/lS5x9n9atAZm9SeLXOxbWBjdzWktlzuGsbFQ/tLGybfXt3A7a2gNqZP0WD6I/8AJIlrdmJTQ0y6wm6yDrr7Km/5qd7Y+1HE6Veb1Z9V1j8RzbKw01Nl3uJMO/zWqQzep/ZhacWz1N5a+oEAxEtezfW9ZmOwjEyxJ1azv/LSwW+99DzDMhhZJP530q3f54S4BroNFcR0dmjOy7K3usxranMg7XNDtw/4PaalZqyH2CfScPIgtP8A4IGN/wCmuVrdZTY2xj4ewyNe4Rsyphc2+oxXeNwbu+i7/CM/zkDjF9lcT1DbGOMTDv3TodPJymuZwMx9E0vdND+5h20/vtDp/trSp6m6q00ZUNcDo6SWEHhzXn3M3fy9/wD1tNMCPFcJAuokose14kfMdwpJiVJJJJKf/9D1VMSACSYA1JKdAynFrIHxI+HH/gmxJTTy854s2VtBgQ4OmBP9Ut/SfvfuKvQ5lbH3iiprq4FcB30j/a/Napej46nuUR1UUsb4lzj+DQpaAFLdWje9noWfq9X0HdneB/eftXDVYNljWivCqe+wwxrasQzDRb2yd3829ln/ABa77Lq/VMj/AIqz/qXLjvq7V/lTAHjH44GO5TYzQkR01YsgsxB6oB0PqTiAOlAkmB+gxv8A3oUb+m5OLNmR09lNTXBvq2UsY1pJ2N9S/AyfXxvd/h2fza7nMy6emU/bLmueGOaK6mCX2WOO2mmsfv2WLjupdX6jnY9tN1tdWNkB1b21CoV8xZXXmZ19Dsp9bvbZbj1ejvToTlI7ADutlCMe5Le6X9YLsbpeZj2Vi/Ia2v7H60l5c+77I7Gy3tP6R2Hk/wCF/wALSsaunIz7HOrx/t9o97rX1ttcWkuayx32m6rGxa7djvs+LRX/ADP84gidzrPtQ3bt/wDOYX0jY3J/7lf6WtH6dkZuG5zcHKduexrS1oxcgxWDsd9noyXXv2MP+Cbv2J3CBZFWVvFdA3SWzoXUWvI/ZQ8RNGNMHXtkp2dC6k4OA6UCQNwijF7fS/7Uoh+sfWyWtvzGb9jXMsa3GZU+s7hVZQ/Ktoe/6Pv9m+qz9HYrOD9ZOrVXss315bC4MNbhSGuL/a2kZWDde3Hut/wP2mv0rLPz0CZ1+ikCF/pOt0CmzF6c2q7DrqeHuOxzAwwe+3HtfUtcvbbjbzRWX0kNgh0bD9GPd+8g4N1GdiVZdE+naJAcIcCDtfW9v5tlbxserdNf843s5hH3e7+CryOpJ3tniNBTDGzHMc1hY2tg0aWzp5O3Od+jWsx4e2eOxHgVkeir2G4ggH85pB+LNoH+cx//AIGmTA3C4NtJJJMS/wD/0fVUG8e5h01DmgHXXSz/ANFIyhYwvZAMOGrT5jUJKQbH+Df83/ancx0NEN0B/N8/ip+sIkiOxB7Hu1L1QRu8OfmnIamax32LJ0b/ADNn5v8AJd5rgOk5jcLKxMstFwx/TNlTXVtfFmBjVMftvtp3M3r0e51d1T6naNsaWEjmHDaucH1JwW1sb9uyXNY0Vt3Nx3ENYAxjdz8ZzvaxS45AAiXVjnEkgjo5HX/rEzqLcaumh+O6k33BznVH3Mxsn04+z33u3Mf71p/VHp2LZVl3PoqsfXazGrL2B22qumj06q930Gbnvf8A11m/WH6vUdNZjW0X23utN9O17agJdjZOyPs9NLtzne1a/wBTc7FbTm1OsYLH3Mva0uA3VWU0elcyfpVu2OT5V7fo/l6lsb4/V/LRL1rqfSui2UU5HThccqfTfVTUGAg/QssufUxr3fmLF6z17pGT0vJqHTDVaK3OptaMZrmWNG6q1r6sn1Wurf7v0a0vrhhW5wrysX07m0sdXdUwtdYWuId/MPd6GZTp78azZb+fjXequMFDDW6hrnDHtY+quqprDD4P8w++r7Rd6f8Ahun3Pp6jV/gvXSxRiQD1G+qskiCR0dTCzqMLq7bsnHGSwnKb6YFeheMPJMDJfVU1vrWWv+l/hFPrmbi9UfW3DxWYdnpW1HWkPf6gAbvZiWXeni4cfbLcm/8AmvS/RodGJi5ec2y2132WMm1l1AY4v2twKWsa3JZY1jvU3M2WsrtYtzovQuiZtL7nuyL62EF2Nca2VO/0brGYlWP9oZuH0Lk6RjGpG7AWxBNx7lv/AFUqtPSXZBADMvIvyKQ5uvp2PJqfH5vq/wA7/bW01rhJIbwfzfL4qTbWNaGgAACAB5JOtaW/EgKtIkkmt2wBQA7MPTf4N/zf9qdgItraYB9z9BGg2s/7+pi5pngAakngAdynpBcXXOEb4DQdIaPo/wBp0700pSpJJIKf/9L1VJJJJSKyrcd7I3dweHeTv/JqqbLa36tBYPps2gPDfgPpN/lsV9QfWywQ8TGoPBB/kuHuaiCpzbcmyp+07CDq120QQe6lRlusJq9u5wlntEbh/wCSVjIwjawNMWNBls+14nn9I0Frv+21UOBRX7v0zHjUbiANO/qsbZU3/OTgY1qjVp9Trb1HEdi2u9I7mvrtY0B9djDvqtZ/KreuWyug9Wr2tOJVfU6XV+mKLKgSf0hopz2eth73+9+PXdZRv/m12eRRXYPtDKrLC8ne2l7HQf3tN300Mek7Ge19OQ30PeA4AOId7X7fb+b9JSQnQ0WSgDu8U3oXUy1zh0xnsgk+jg9zCN+yOsZdkW4bvUeA02RjhhY383Kopez7Qxn5lnsyqf8AA3rrKbcU0ZEMvADW7gds/SH0dFKk0Ciy5lWQd/6ICAXaiXubp+6nnKddAt9sdy8L6nUemZpDmmu+wEPY8es25nffx+0qNv8AhPZ1TH/P9dd9S6rEx2sprZWbv0jgBOnDXO3Hc7dH5yr2dJw+oVOqzMa70AN/6UtbqPo+m72uZZ/LarX2XHyHGwusLncNriwCNGt31tLGf2npmScZVelbroQIvr2U3Lsc4NaGlxMAbQjG6xxAbsFbfabC2Q5353pt/P8A7CljYLqiXMbsJEb7CHujuAxn6Nv+fYrVdFdZ3aufEb3amPBv5rP6rFEZDovYV0ufDrG7WCCGQASR+fZH/Qr/ANWWEkk1KkkkklP/0/VUl8qpJKfqpJfKqSSn6qSXyqkkp+nc3+cb/Rv+v/S/spM9DZ7t8/8AA+tt+Xpr5iSSU/T36t/3Y/8AB0v1aDHr/wBr14/6S+YUklP0xXH2hsfZI+fqf9JaS+VUklP1UkvlVJJT9VJL5VSSU/VSS+VUklP/2f/tFWBQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNBDoAAAAAAPEAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAAEgBQAHIAbwBvAGYALQBFAGkAbgBzAHQAZQBsAGwAdQBuAGcAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAA4QklNBAIAAAAAAAIAADhCSU0EMAAAAAAAAQEAOEJJTQQtAAAAAAAGAAEAAAADOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA1sAAAAGAAAAAAAAAAAAAABDAAAAjgAAABMASQBNAEcAXwBMAE8ARwBPAF8AUwBNAEEATABMAF8ARABBAFQAQQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAjgAAAEMAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAEMAAAAAUmdodGxvbmcAAACOAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAABDAAAAAFJnaHRsb25nAAAAjgAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25l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WE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE2LTA0LTIwVDE2OjI2OjA4KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNi0wNC0yMFQxNjozMzo1MyswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNi0wNC0yMFQxNjozMzo1MyswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMwMGNkZDg3LWIyMjYtYjE0OC1iY2NjLWE2ZjM1MmRmYWM0MSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmUyY2IwZDhkLTA3MDQtMTFlNi1iZjViLWI2ODUwN2Y5NTVjOSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmVhMGMwZDYwLTNhNTgtNzI0Mi1hNDBmLTgyZmUwZDljNTYzZiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWEwYzBkNjAtM2E1OC03MjQyLWE0MGYtODJmZTBkOWM1NjNmIiBzdEV2dDp3aGVuPSIyMDE2LTA0LTIwVDE2OjI2OjA4KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9wbmcgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzAwY2RkODctYjIyNi1iMTQ4LWJjY2MtYTZmMzUyZGZhYzQxIiBzdEV2dDp3aGVuPSIyMDE2LTA0LTIwVDE2OjMzOjUzKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAOQWRvYmUAZEAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQEBAQECAgECAgMDAwMD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',
            'jpeg', 145, 20, 142 / 3, 67 / 3);

        this.cursor = {x: 20, y: 30};
        this.pdf.setFontType('bold');
        this.pdf.setFontSize(14);
        this.pdf.text(translate('AuditCyclePlan'), this.cursor.x, this.cursor.y += 10);
        this.pdf.setFontType('normal');
        this.pdf.setFontSize(12);

        this.cursor = {x: 20, y: 50};
        this.pdf.text(translate('Customer'), this.cursor.x, this.cursor.y += 10);
        this.pdf.text(translate('#Ref.'), this.cursor.x, this.cursor.y += 10);
        this.pdf.text(translate('Standard'), this.cursor.x, this.cursor.y += 10);
        this.pdf.text(translate('First Day'), this.cursor.x, this.cursor.y += 10);
        this.pdf.text(translate('Last Day'), this.cursor.x, this.cursor.y += 10);
        this.pdf.text(translate('Audit File ID'), this.cursor.x, this.cursor.y += 10);

        this.cursor = {x: 60, y: 50};

        this.pdf.text(this.header.businessRelationName, this.cursor.x, this.cursor.y += 10);
        this.pdf.text(this.header.businessRelationId, this.cursor.x, this.cursor.y += 10);
        this.pdf.text(this.header.standard, this.cursor.x, this.cursor.y += 10);
        this.pdf.text(this.header.firstDay, this.cursor.x, this.cursor.y += 10);
        this.pdf.text(this.header.lastDay, this.cursor.x, this.cursor.y += 10);
        this.pdf.text(this.header.auditFileId, this.cursor.x, this.cursor.y += 10);
    }
}

let currentLanguage;
function generatePDF(header, languageID, filename) {
    currentLanguage = languageID;

    let auditCyclePlanPDF = new AuditCyclePlanPDF();
    auditCyclePlanPDF.generate(header, languageID);

    if (filename) auditCyclePlanPDF.download(filename);
    else return auditCyclePlanPDF.getBlob();
}

function getLangTextByKey(key) {
    let i18n = {};
    try {
        i18n = JSON.parse(localisation.i18n.get());
    }
    catch (e) {
        i18n = [];
    }
    return i18n[key] === undefined ? '' : i18n[key];
}

$('#generatePDF-en').on('click', () => generatePDF(header, 'en', 'generatePDF-en'));
$('#generatePDF-jp').on('click', () => generatePDF(header, 'jp', 'generatePDF-jp'));
$('#generatePDF-cn').on('click',  () => generatePDF(header, 'cn', 'generatePDF-cn'));
$('#generatePDF-ru').on('click', () => generatePDF(header, 'ru', 'generatePDF-ru'));
$('#generatePDF-sk').on('click',  () => generatePDF(header, 'sk', 'generatePDF-sk'));
$('#generatePDF-ir').on('click',  () => generatePDF(header, 'ir', 'generatePDF-ir'));
$('#generatePDF-kr').on('click', () => generatePDF(header, 'kr', 'generatePDF-kr'));

const header = {
    businessRelationId: 'BusinessRelationId',
    businessRelationName: 'BusinessRelaionName',
    standard: 'Standard',
    firstDay: 'FirstDay',
    lastDay: 'LastDay',
    auditFileId: 'AuditFileId',
};

let localisation = {};
localisation.i18n = {};
localisation.i18n.get = function () {

    switch (currentLanguage) {

        case 'jp':
            return JSON.stringify({
                customer: "顧客",
                refNo: "登録番号(Ref. No)",
                standard: "規格",
                firstDay: "初日",
                lastDay: "最終日",
                auditCycleManager: {
                    requirements: "Requirements",
                    processesOfTheOrganization: "Processes of the Organization",
                    coveredRequirementsReference: "Covered Requirements / Reference"
                }
            });

        case 'cn':
            return JSON.stringify({
                customer: "顾客",
                refNo: "客户编号",
                standard: "标准",
                firstDay: "第一天",
                lastDay: "最后一天",
                auditCycleManager: {
                    requirements: "要求",
                    processesOfTheOrganization: "组织的过程",
                    coveredRequirementsReference: "覆盖的要求 / 条款"
                }
            });

        case 'ru':
            return JSON.stringify({
                customer: "Заказчик",
                refNo: "Рег. номер",
                standard: "Стандарт",
                firstDay: "Первый день",
                lastDay: "Последний день",
                auditCycleManager: {
                    requirements: "Requirements",
                    processesOfTheOrganization: "Processes of the Organization",
                    coveredRequirementsReference: "Covered Requirements / Reference"
                }
            });

        case 'sk':
            return JSON.stringify({
                customer: "Zákazník",
                refNo: "#Ref.",
                standard: "Štandard",
                firstDay: "Prvý deň",
                lastDay: "Posledný deň",
                auditCycleManager: {
                    requirements: "Requirements",
                    processesOfTheOrganization: "Processes of the Organization",
                    coveredRequirementsReference: "Covered Requirements / Reference"
                }
            });

        default:
            return JSON.stringify({
                customer: "Customer",
                refNo: "#Ref.",
                standard: "Standard",
                firstDay: "First day",
                lastDay: "Last day",
                auditCycleManager: {
                    requirements: "Requirements",
                    processesOfTheOrganization: "Processes of the Organization",
                    coveredRequirementsReference: "Covered Requirements / Reference"
                }
            });
    }
};