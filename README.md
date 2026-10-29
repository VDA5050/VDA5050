# VDA5050 - Version 3.0.0

An open standard for communication between mobile robot fleets and a central fleet control. Developed jointly by the German Association of the Automotive Industry (www.vda.de) and the VDMA (www.vdma.org), as well as the Institute for Material Handling and Logistics (IFL) at the Karlsruhe Institute of Technology (www.ifl.kit.edu) and many contributors from the mobile robot industry.

**Note**: We are constantly working to improve the VDA 5050. If there are any differences between the markdown document/JSON schemas on GitHub and the published document by the VDA, the PDF on the VDA website is valid. The current version of the official VDA 5050 document can be found ([here](https://www.vda.de/vda-5050)).

## How to contribute
If you work for a VDA / VDMA member, ask your contact person if you can join the working group.
Everyone is free to raise issues or suggest new improvements to the protocol.

Anyone is free to raise issues or suggest new improvements to the protocol using the Github issues. Github issues will be marked by the VDA/VDMA team as **VD(M)A in progress** if the issue is discussed in the monthly VDA 5050 meetings. If the issue has been accepted by the team, it will receive a milestone tag indicating when the change will be added to the document, according to

- V3.0.1: Minor changes such as typos and fixes,
- V3.1.0: Non-breaking, backward-compatible changes,
- V4.0.0 (Currently not planned): Breaking changes, which would mean reworking structures or variable names.

When creating pull requests, please create them against the *development* branch. The *main* branch contains the latest published version of VDA 5050 (currently version 3.0.0).

## Roadmap

This roadmap shows what the core team is working on. Comments and proposals are welcome as [GitHub issues](https://github.com/VDA5050/VDA5050/issues).

### Ongoing: JSON-schema fixes
- Schema errors are fixed directly on `main` without waiting for a release. If the document and a schema differ, the document is leading.

### V3.0.1: bugfix release
- Fixes typos and content errors that were found in the document after the 3.0.0 release.
- Following design decisions made in the core team for version 3 development.
- No new features added.
- Pull requests go against `dev/3.0.1`.

### V3.y: possible backward-compatible extensions (not yet determined)
- **Semantic reporting:** robots report what they observe, e.g. a full storage location or debris on the path.
- **LIF integration:** reference the Layout Interchange Format (LIF) more explicitly, with when it is useful and where its limits are.
- **Information for HMIs:** provide the data that human-machine interfaces need.
- **Compressed data format:** smaller messages, e.g. for cloud brokers that charge per message.
- **Vehicles not controlled via VDA 5050:** dedicated topic for reporting of position, e.g. for manual forklifts, so that fleet control can take them into account.
- **Maintenance data:** either as dedicated topic or as optional state fields.

Pull requests go against `dev/3.1.0`.

### V4.0.0: breaking changes
Not planned.

### Beyond the specification
- **Humanoid robots:** no protocol extension is planned. Instead, a collection of use cases with a short how-to will show how humanoids fit into VDA 5050.
- **Vehicles not controlled via VDA 5050:** a guideline on how fleet control handles the position of such vehicles.

## Legal notice regarding the scope of support for VDA 5050 on GitHub
Use of this GitHub repository and all content, information, and support services offered therein is at your own risk.
With the release of a new version of VDA 5050, the core team may provide support for this version at its own discretion. There is no legal entitlement to support, maintenance, troubleshooting, further development, or timely response at any time. In particular, there is no legal obligation to process issues or to review or accept pull requests.
No support is provided for any previously published versions of VDA 5050. Any responses to issues or other feedback are provided on a voluntary basis, are non-binding, and do not constitute recognition of any legal obligation.

## Disclaimer
Use of this GitHub repository and all content, information, and support services contained therein is at your own risk. No guarantee is given for the accuracy, completeness, timeliness, suitability for a particular purpose, or availability of the content.
All information, advice, and support services are provided voluntarily, without obligation, and without legal claim. No contractual relationship, in particular a support, service, or consulting contract, is established.
Liability for damages arising from the use or non-use of the information provided, from incorrect or incomplete content, or from failure to provide support is excluded. This also applies to indirect damages, consequential damages, and lost profits. Liability for intent, gross negligence, and injury to life, limb, or health remains unaffected.