# Annex A:   
# AGV factsheet

# **A1 Scope**

## A1.1 Scope of this annex

This annex specifies an AGV factsheet to be used with VD[M]A-5050-conforming AGVs and control systems.

The factsheet provides basic information about a specific AGV type series.
This information allows comparison of different AGV types and can be applied for the planning, dimensioning and simulation of an AGV system.
The factsheet also includes information about AGV communication interfaces which are required for the integration of an AGV type series into a VD[M]A-5050-compliant master control.

The values for some fields in the AGV factsheet can only be specified during system integration, for example the assignment of project-specific load and station types, together with the list of station and load types which are supported by this AGV.

The factsheet is both intended as a human-readable document and for machine processing, e.g. an import by the master control application, and thus is specified as a JSON document.

## A1.2 Syntax used in this specification

The following conventions are used in this document for identifier keys:

-   *Italic* identifiers indicate optional parameters

-   Identifiers in standard font are mandatory parameters

-   **Bold** identifiers indicate JSON-objects

-   Square brackets [] indicate arrays

# **A2 Contents of the AGV factsheet**

The following tables specify the sections of the AGV factsheet as JSON structures.

## Header

The header is identically to the corresponding VD[M]A-5050 specification.
The header is not a JSON-object, but consists of five separate entries in the top level of the JSON-file.

| **Field**    | **data type** | **description**                                                                                                                         |
|--------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| *headerId*   | uint32        | header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| *timestamp*  | string        | Timestamp (ISO8601, UTC); YYYY-MM-DDTHH:mm:ss.ssZ (e.g.“2020-12-15T11:40:03.12Z”)                                                       |
| version      | string        | Version of the VD[M]A-5050 protocol [Major].[Minor].[Patch] (e.g. 1.3.2)                                                                |
| manufacturer | string        | Manufacturer of the AGV                                                                                                                 |
| serialNumber | string        | Serial number of the AGV                                                                                                                |

The fields headerId and timestamp are only relevant for an automatic electronic transfer of the factsheet.

## Main JSON structure

The factsheet consists of the JSON-objects listed in the following table.

| **Field**              | **data type** | **description**                                                                     |
|------------------------|---------------|-------------------------------------------------------------------------------------|
| header                 | N/A           | header                                                                              |
| typeSpecification      | JSON-object   | These parameters generally specify the class and the capabilities of the AGV        |
| physicalParameters     | JSON-object   | These parameters specify the basic physical properties of the AGV                   |
| protocolLimits         | JSON-object   | Limits for length of identifiers, arrays, strings and similar in MQTT communication |
| protocolFeatures       | JSON-object   | Supported features of VDA5050 protocol                                              |
| agvGeometry            | JSON-object   | Detailed definition of AGV geometry                                                 |
| loadSpecification      | JSON-object   | Abstract specification of load capabilities                                         |
| localizationParameters | JSON-object   | Detailed specification of localization                                              |

## JSON objects

### typeSpecification

This JSON object describes general properties of the AGV type.

| **Field**           | **data type**   | **description** |
|---------------------|-----------------|-----------------|
| seriesName          | string          | Free text generalized series name as specified by manufacturer |
| *seriesDescription* | string          | Free text human readable description of the AGV type series    |
| agvKinematic        | string          | simplified description of AGV kinematics-type.<br/> [DIFF, OMNI, THREEWHEEL]<br/>DIFF: differential drive<br/>OMNI: omni-directional vehicle<br/>THREEWHEEL: three-wheel-driven vehicle or vehicle with similar kinematics |
| agvClass            | string          | simplified description of AGV class.<br/>[FORKLIFT, CONVEYOR, TUGGER, CARRIER]<br/>FORKLIFT: forklift<br/>CONVEYOR: AGV with conveyors on it</br>TUGGER: tugger<br/>CARRIER: load carrier with or without lifting unit |
| maxLoadMass         | float64         | [kg], maximum loadable mass |
| localizationTypes   | Array of String | simplified description of localization type<br/>Example values:<br/>NATURAL: natural landmarks<br/>REFLECTOR: laser reflectors<br/>RFID: RFID-tags<br/>DMC: data matrix code<br/>SPOT: magnetic spots<br/>GRID: magnetic grid<br/>
| navigationTypes     | Array of String | List of path planning types supported by the AGV, sorted by priority<br/>Example values:<br/>PHYSICAL_LINE_GUIDED: No path planning, AGV follows physical installed paths.<br/>VIRTUAL_LINE_GUIDED: Agv goes fixed (virtual) paths<br/>AUTONOMOUS: Agv plans its path autonomously|

### physicalParameters

This JSON-object describes physical properties of the AGV.

| **Field**       | **data type** | **description**                                       |
|-----------------|---------------|-------------------------------------------------------|
| speedMin        | float64       | [m/s] minimal controlled continuous speed of the AGV  |
| speedMax        | float64       | [m/s] maximum speed of the AGV                        |
| accelerationMax | float64       | [m/s²] maximum acceleration with maximum load         |
| decelerationMax | float64       | [m/s²] maximum deceleration with maximum load         |
| heightMin       | float64       | [m] minimum height of AGV                             |
| heightMax       | float64       | [m] maximum height of AGV                             |
| width           | float64       | [m] width of AGV                                      |
| length          | float64       | [m] length of AGV                                     |

### protocolLimits

This JSON-object describes the protocol limitations of the AGV.
If a parameter is not defined or set to zero then there is no explicit limit for this parameter.

| **Field**                     | **data type** | **description**                             |
|-------------------------------|---------------|---------------------------------------------|
| maxStringLens {               | JSON-object   | maximum lengths of strings,                 |
| *msgLen*                      | uint32        | maximum MQTT Message length                 |
| *topicSerialLen*              | uint32        | maximum length of serial-number part in MQTT-topics<br/><br/>Affected Parameters:<br/>order.serialNumber<br/>instantActions.serialNumber<br/>state.SerialNumber<br/>visualization.serialNumber<br/>connection.serialNumber   |
| *topicElemLen*                | uint32        | maximum length of all other parts in MQTT-topics<br/><br/>Affected parameters:<br/>order.timestamp<br/>order.version<br/>order.manufacturer<br/>instantActions.timestamp<br/>instantActions.version<br/>instantActions.manufacturer<br/>state.timestamp<br/>state.version<br/>state.manufacturer<br/>visualization.timestamp<br/>visualization.version<br/>visualization.manufacturer<br/>connection.timestamp<br/>connection.version<br/>connection.manufacturer |
| *idLen*                       | uint32        | maximum length of ID-Strings<br/><br/>Affected parameters:<br/>order.orderId<br/>order.zoneSetId<br/>node.nodeId<br/>nodePosition.mapId<br/>action.actionId<br/>edge.edgeId<br/>edge.startNodeId<br/>edge.endNodeId |
| *idNumericalOnly*             | Bool          | If true ID-strings need to contain numerical values only |
| *enumLen*                     | uint32        | maximum length of ENUM- and Key-Strings<br/><br/>Affected parameters:<br/>action.actionType action.blockingType<br/>edge.direction<br/>actionParameter.key<br/>state.operatingMode<br/>load.loadPosition<br/>load.loadType<br/>actionState.actionStatus<br/>error.errorType<br/>error.errorLevel<br/>errorReference.referenceKey<br/>info.infoType<br/>info.infoLevel<br/>safetyState.eStop<br/>connection.connectionState                                               |
| *loadIdLen*                   | uint32        | maximum length of loadId Strings |
| }                             |               |                                  |
| maxArrayLens {                | JSON-object   | maximum lengths of arrays                                 |
| *order.nodes*                 | uint32        | maximum number of nodes per order processable by the AGV  |
| *order.edges*                 | uint32        | maximum number of edges per order processable by the AGV  |
| *node.actions*                | uint32        | maximum number of actions per node processable by the AGV |
| *edge.actions*                | uint32        | maximum number of actions per edge processable by the AGV |
| *actions.actionsParameters*   | uint32        | maximum number of parameters per action processable by the AGV |
| *instantActions*              | uint32        | maximum number of instant actions per message processable by the AGV |
| *trajectory.knotVector*       | uint32        | maximum number of knots per trajectory processable by the AGV |
| *trajectory.controlPoints*    | uint32        | maximum number of control points per trajectory processable by the AGV |
| *state.nodeStates*            | uint32        | maximum number of nodeStates sent by the AGV, maximum number of nodes in base of AGV |
| *state.edgeStates*            | uint32        | maximum number of edgeStates sent by the AGV, maximum number of edges in base of AGV |
| *state.loads*                 | uint32        | maximum number of load-objects sent by the AGV                |
| *state.actionStates*          | uint32        | maximum number of actionStates sent by the AGV                |
| *state.errors*                | uint32        | maximum number of errors sent by the AGV in one state-message |
| *state.informations*          | uint32        | maximum number of informations sent by the AGV in one state-message    |
| *error.errorReferences*       | uint32        | maximum number of error references sent by the AGV for each error      |
| *informations.infoReferences* | uint32        | maximum number of info references sent by the AGV for each information |
| }                             |               |                                                                        |
| timing {                      | JSON-object   | timing information                                            |
| minOrderInterval              | float32       | [s] minimum interval sending order messages to the AGV        |
| minStateInterval              | float32       | [s] minimum interval for sending state-messages               |
| *defaultStateInterval*        | float32       | [s] default interval for sending state-messages *if not defined, the default value from the main document is used* |
|  *visualisationInterval*      | float32       | [s] default interval for sending messages on visualisation topic       |
| }                             |               |                                                               |

### agvProtocolFeatures

This JSON object defines actions and parameters which are supported by the AGV.

| **Field**    | **data type** | **description**  |
|--------------|---------------|------------------|
| optionalParameters [optionalParameter] | Array of JSON-object | list of supported and/or required optional parameters<br/>Optional parameters, that are not listed here, are assumed to be not supported by the AGV. |                                                |
| {            |               |                  |
| parameter    | string        | full name of optional parameter, e.g. “*order.nodes.nodePosition.allowedDeviationTheta”*|
| support      | enum          | type of support for the optional parameter, the following values are possible:<br/>SUPPORTED: optional parameter is supported like specified<br/>REQUIRED: optional parameter is required for proper AGV-operation |
| *description*| string        | free text<br/>Description of optional parameter. E.g.<ul><li>Reason, why the optional parameter ‚direction‘ is necessary for this AGV-type and which values it can contain.</li><li>The parameter ‘nodeMarker’ must contain unsigned interger-numbers only.</li><li>Nurbs-Support is limited to straight lines and circle segments.</li>
| }            |               |                  |
| agvActions [agvAction] | Array of JSON-object | list of all actions with parameters supported by this AGV. This includes standard actions specified in VDA5050 and manufacturer-specific actions |
| {            |               |                  |
| actionType   | string        | unique actionType corresponding to action.actionType |
| *actionDescription* | string  | free text: description of the action |
| actionScopes | array of enum | list of allowed scopes for using this action-type<br/><br/>INSTANT: usable as instantAction<br/>NODE: usable on nodes<br/>EDGE: usable on edges<br/><br/>e.g. ```[„INSTANT“, „NODE“]```|
| *actionParameters [actionParameter]* | Array of JSON-object | list of parameters<br/>if not defined, the action has no parameters |
|&emsp;*{*     |               |                  |
|&emsp;key     | string        | key-String for Parameter |
|&emsp;valueDataType | enum    | data type of Value, possible data types are: BOOL, NUMBER, INTEGER, FLOAT, STRING, OBJECT, ARRAY |
|&ensp;*description* | string  | free text: description of the parameter |
|&ensp;*isOptional*  | Bool    | True: optional parameter |
|&ensp;*}*           |         |                          |         
|*resultDescription* | string  | free text: description of the resultDescription |
|*}*                 |         |                          |

### agvGeometry

This JSON object defines the geometry properties of the AGV, e.g. outlines and wheel positions

| **Field**                            | **data type**        | **description**                                        |
|--------------------------------------|----------------------|--------------------------------------------------------|
| *wheelDefinitions [wheelDefinition]* | Array of JSON-object | list of wheels, containing wheel-arrangement and geometry |
| {                                    |                      |                                                        |
| type                                 | enum                 | wheel type<br/>```DRIVE, CASTER, FIXED, MECANUM```     |
| isActiveDriven                       | Bool                 | True: wheel is actively driven (de: angetrieben)       |
| isActiveSteered                      | Bool                 | True: wheel is actively steered (de: aktiv gelenkt)    |
| position {                           | JSON-object          |                                                        |
|&emsp; x                              | float64              | [m] x-position in AGV-coordinate system          |
|&emsp; y                              | float64              | [m] y-position in AGV-coordinate system          |
|&emsp; *theta*                        | float64              | [rad] orientation of wheel in AGV-coordinate system Necessary for fixed wheels |
| }                                    |                      |                                                        |
| diameter                             | float64              | [m] nominal diameter of wheel                          |
| width                                | float64              | [m] nominal width of wheel                             |
| *centerDisplacement*                 | float64              | [m] nominal displacement of the wheel’s center to the rotation point (necessary for caster wheels).<br/> if the parameter is not defined, it is assumed to be 0            |
| *constraints*                        | string               | free text: can be used by the manufacturer to define constraints |
| }                                    |                      |                                                        |
| *envelopes2d [envelope2d]*           | Array of JSON-object | list of AGV-envelope curves in 2D (german: „Hüllkurven“), e.g.the mechanical envelopes for unloaded and loaded state, the safety fields for different speed cases |
| {                                    |                      |                                                        |
| set                                  | string               | name of the envelope curve set                         |
| polygonPoints [polygonPoint]         | Array of JSON-object | envelope curve as a x/y-polygon polygon is assumed as closed and must be non-self-intersecting |
| {                                    |                      |                                                        |
|&emsp; x                              | float64              | [m] x-position of polygon-point                        |
|&emsp; y                              | float64              | [m] y-position of polygon-point                        |
| }                                    |                      |                                                        |
| *description*                        | String               | free text: description of envelope curve set                                                                                                                      |
| *}*                                  |                      |                                                        |
| *envelopes3d [envelope3d]*           | Array of JSON-object | list of AGV-envelope curves in 3D (german: „Hüllkurven“) |
| *{*                                  |                      |                                                        |
| set                                  | String               | name of the envelope curve set                         |
| format                               | String               | format of data e.g. DXF                                |
| *data*                               | JSON-object          | 3D-envelope curve data, format specified in ‚format‘   |
| *url*                                | String               | protocol and url-definition for downloading the 3D-envelope curve data e.g. <ftp://xxx.yyy.com/ac4dgvhoif5tghji> |
| *description*                        | String               | free text: description of envelope curve set           |
| *}*                                  |                      |                                                        |

### loadSpecification

This JSON object specifies load handling and supported load types of the AGV.

| **Field**                        | **data type**        | **description**                                                      |
|----------------------------------|----------------------|----------------------------------------------------------------------|
| *loadPositions*         | Array of String      | list of load positions / load handling devices<br/>This lists contains the valid values for the oarameter “state.loads[].loadPosition” and for the action parameter “lhd” of the actions pick and drop.<br/>*If this list doesn’t exist or is empty, the AGV has no load handling device.* |
| *loadSets [loadSet]*    | Array of JSON-object | list of load-sets that can be handled by the AGV                     |
| {                                    |                      |                                                        |
|&emsp; setName                 | String               | Unique name of the load set, e.g. DEFAULT, SET1, ...                  |
|&emsp; loadType                | String               | type of load e.g. EPAL, XLT1200, ….                                  |
|&emsp; *loadPositions*         | Array of String      | list of load positions btw. load handling devices, this load-set is valid for.<br/>*If this parameter does not exist or is empty, this load-set is valid for all load handling devices on this AGV.* |
|&emsp; *boundingBoxReference*  | JSON-object          | bounding box reference as defined in parameter loads[] in state-message |
|&emsp; *loadDimensions*        | JSON-object          | load dimensions as defined in parameter loads[] in state-message     |
|&emsp; *maxWeight*             | float64              | [kg] maximum weight of loadtype                                      |
|&emsp; *minLoadhandlingHeight* | float64              | [m] minimum allowed height for handling of this load-type and –weight<br/>references to boundingBoxReference |
|&emsp;  *maxLoadhandlingHeight* | float64              | [m] maximum allowed height for handling of this load-type and –weight<br/>references to boundingBoxReference |
|&emsp; *minLoadhandlingDepth*  | float64              | [m] minimum allowed depth for this load-type and –weight<br/>references to boundingBoxReference |
|&emsp; *maxLoadhandlingDepth*  | float64              | [m] maximum allowed depth for this load-type and –weight<br/>references to boundingBoxReference |
|&emsp; *minLoadhandlingTilt*   | float64              | [rad] minimum allowed tilt for this load-type and –weight            |
|&emsp; *maxLoadhandlingTilt*   | float64              | [rad] maximum allowed tilt for this load-type and –weight            |
|&emsp; *agvSpeedLimit*         | float64              | [m/s] maximum allowed speed for this load-type and –weight           |
|&emsp; *agvAccelerationLimit*  | float64              | [m/s²] maximum allowed acceleration for this load-type and –weight   |
|&emsp; *agvDecelerationLimit*  | float64              | [m/s²] maximum allowed deceleration for this load-type and –weight   |
|&emsp; *pickTime*              | float64              | [s] approx. time for picking up the load                  |
|&emsp; *dropTime*              | float64              | [s] approx. time for dropping the load                    |
|&emsp; *description*           | String               | free text description of the load handling set            |
| }                       |                      |                                                           |